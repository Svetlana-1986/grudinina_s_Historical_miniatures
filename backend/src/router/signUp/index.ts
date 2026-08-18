import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';

import { trpc } from '../../lib/trpc.js';
import { zSignUpTrpcInput } from './input.js';
import { hashPassword } from '../../utils/password.js';

export const signUpTrpcRoute = trpc.procedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const normalizedNick = input.nick.trim().toLowerCase();

    try {
      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          nick: normalizedNick,
        },
      });

      if (existingUser) {
        console.warn(`[SignUp] Отклонено: ник ${normalizedNick} уже занят`);
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Пользователь с таким именем уже существует',
        });
      }

      //  Хеширование пароля
      const passwordHash = await hashPassword(input.password);

      const user = await ctx.prisma.user.create({
        data: {
          nick: normalizedNick,
          displayName: input.displayName.trim(),
          passwordHash,
        },
      });

      console.info(
        `[SignUp] Успешная регистрация. Новый пользователь: ${normalizedNick}`,
      );

      return {
        success: true,
        userId: user.id,
      };
    } catch (error) {
      // Обработка уникального ограничения Prisma (P2002)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.warn(
            `[SignUp] Ошибка Prisma P2002 (Race Condition): ник ${normalizedNick} был занят параллельным запросом`,
          );
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Пользователь с таким именем уже существует',
          });
        }
      }

      // Если это уже выброшенная нами TRPCError, просто прокидываем её дальше
      if (error instanceof TRPCError) {
        throw error;
      }

      // Обработка непредвиденных ошибок и их логирование
      console.error('[SignUp] Критическая ошибка при регистрации:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Произошла внутренняя ошибка сервера при регистрации',
        cause: error,
      });
    }
  });
