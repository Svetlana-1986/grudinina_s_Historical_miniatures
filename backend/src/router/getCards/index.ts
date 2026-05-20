import _ from 'lodash';
import { cards } from '../../lib/cards';
import { trpc } from '../../lib/trpc';

export const getCardsTrpcRoute = trpc.procedure.query(() => {
  // покажет только эти строки
  return {
    cards: cards.map((card) =>
      _.pick(card, [
        'slug',
        'title',
        'historicalPeriod',
        'authorNick',
        'authorName',
        'description',
      ]),
    ),
  };
});
