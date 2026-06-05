import { trpc } from '../../lib/trpc.js';

export const signOutTrpcRoute = trpc.procedure.mutation(async ({ ctx }) => {
  const sessionToken = ctx.req.cookies.sessionToken;

  if (sessionToken) {
    await ctx.prisma.session.deleteMany({
      where: {
        token: sessionToken,
      },
    });
  }

  ctx.res.clearCookie('sessionToken');

  return {
    success: true,
  };
});
