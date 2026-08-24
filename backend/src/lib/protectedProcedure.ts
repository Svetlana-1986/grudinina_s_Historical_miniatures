import { TRPCError } from '@trpc/server';

import { trpc } from './trpc.js';

import { getCurrentUser } from '../utils/getCurrentUser.js';

export const protectedProcedure = trpc.procedure.use(async ({ ctx, next }) => {
  let user = null;
  // let user: User | null = null;

  try {
    user = await getCurrentUser(ctx);
  } catch (error) {
    // Логируем реальную ошибку на сервере для отладки
    console.error('Ошибка при получении текущего пользователя:', error);

    // Выбрасываем ошибку сервера, чтобы фронтенд понимал, что что-то пошло не так
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'Не удалось проверить авторизацию из-за внутренней ошибки сервера.',
      cause: error, // Опционально: передаем первопричину для логирования в tRPC
    });
  }

  // Если код выполнился успешно, но пользователя просто нет в базе
  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Вы не авторизованы.',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user, // Теперь TypeScript на 100% уверен, что user здесь существует и не равен null
    },
  });
});
