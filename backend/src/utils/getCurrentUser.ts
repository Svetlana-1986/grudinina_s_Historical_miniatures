import type { AppContext } from '../lib/ctx.js';

export const getCurrentUser = async (ctx: AppContext) => {
  const sessionToken = ctx.req.cookies.sessionToken;

  if (!sessionToken) {
    return null;
  }

  const session = await ctx.prisma.session.findUnique({
    where: {
      token: sessionToken,
    },

    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  const isExpired = session.expiresAt < new Date();

  if (isExpired) {
    try {
      await ctx.prisma.session.delete({
        where: {
          id: session.id,
        },
      });
    } catch (error) {
      console.error(
        `[Session] Не удалось удалить просроченную сессию ${session.id}`,
        error,
      );
    }

    return null;
  }

  return session.user;
};
