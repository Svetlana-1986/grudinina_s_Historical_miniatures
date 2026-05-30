import { trpc } from '../../lib/trpc.js';

export const getCardsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const cards = await ctx.prisma.card.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      historicalPeriod: true,
      authorNick: true,
      authorName: true,
      description: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: 'desc',
    },

    take: 20,
  });

  return { cards };
});
