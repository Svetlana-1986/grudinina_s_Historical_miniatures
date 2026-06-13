import { protectedProcedure } from '../../lib/protectedProcedure.js';

export const getMyCardsTrpcRoute = protectedProcedure.query(async ({ ctx }) => {
  return ctx.prisma.card.findMany({
    where: {
      authorId: ctx.user.id,
    },

    orderBy: {
      createdAt: 'desc',
    },
  });
});
