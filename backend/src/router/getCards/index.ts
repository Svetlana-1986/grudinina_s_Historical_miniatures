import { trpc } from '../../lib/trpc.js';


export const getCardsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const cards = await ctx.prisma.card.findMany({
    include: {
      author: true,
    },

    orderBy: {
      createdAt: 'desc',
    },

    take: 20,
  });

  return {
    cards,
  };
});

