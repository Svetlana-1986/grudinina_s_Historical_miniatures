// import _ from 'lodash';
// import { cards } from '../../lib/cards';
import { trpc } from '../../lib/trpc';

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
    },
  });
  return {cards}
})


  // покажет только эти строки
  // return {
  //   cards: cards.map((card) =>
  //     _.pick(card, [
  //       'slug',
  //       'title',
  //       'historicalPeriod',
  //       'authorNick',
  //       'authorName',
  //       'description',
  //     ]),
  //   ),
  // };

