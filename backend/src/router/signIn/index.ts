import { verifyPassword } from '../../utils/password.js';
import { trpc } from '../../lib/trpc.js';
import { TRPCError } from '@trpc/server';
import { zSignInTrpcInput } from './input.js';
import { generateSessionToken } from '../../utils/generateSessionToken.js';

export const signInTrpcRoute = trpc.procedure
  .input(zSignInTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const normalizedNick = input.nick.trim().toLowerCase();
    const password = input.password;

    try {
      const user = await ctx.prisma.user.findUnique({
        where: {
          nick: normalizedNick,
        },
      });

      if (!user) {
        console.warn(
          `[SignIn] Неудачная попытка входа: ${normalizedNick} (пользователь не найден)`,
        );
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Неверный логин или пароль',
        });
      }

      const passwordMatches = await verifyPassword(password, user.passwordHash);

      if (!passwordMatches) {
        console.warn(
          `[SignIn] Неудачная попытка входа: ${normalizedNick} (неверный пароль)`,
        );
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Неверный логин или пароль',
        });
      }

      const sessionToken = generateSessionToken();
      const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 24 * 30;

      // Переносим создание сессии в локальный try-блок для обеспечения Rollback
      let createdSessionId: string | null = null;

      try {
        const session = await ctx.prisma.session.create({
          data: {
            token: sessionToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + SESSION_LIFETIME_MS),
          },
        });
        createdSessionId = session.id;

        // Попытка установить куку
        ctx.res.cookie('sessionToken', sessionToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          expires: new Date(Date.now() + SESSION_LIFETIME_MS),
        });
      } catch (cookieOrDbError) {
        // Если сессия в БД успела создаться, но дальше (например, на куках) произошел сбой — удаляем её
        if (createdSessionId) {
          console.error(
            `[SignIn] Сбой при установке куки или создании сессии. Выполняется Rollback для сессии ID: ${createdSessionId}`,
          );
          try {
            await ctx.prisma.session.delete({
              where: { id: createdSessionId },
            });
          } catch (rollbackError) {
            console.error(
              `[SignIn] Критическая ошибка: Не удалось выполнить Rollback сессии ${createdSessionId}:`,
              rollbackError,
            );
          }
        }
        // Пробрасываем ошибку дальше, чтобы её перехватил внешний catch блок
        throw cookieOrDbError;
      }

      console.info(
        `[SignIn] Пользователь ${normalizedNick} успешно авторизован`,
      );

      return {
        success: true,
        userId: user.id,
        nick: user.nick,
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }

      console.error('[SignIn] Ошибка входа:', error);

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Произошла внутренняя ошибка сервера при авторизации.',
        cause: error,
      });
    }
  });
