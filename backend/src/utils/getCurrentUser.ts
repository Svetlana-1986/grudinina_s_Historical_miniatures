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

  if (session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
};
