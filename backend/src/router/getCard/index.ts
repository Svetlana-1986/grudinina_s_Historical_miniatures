import { z } from 'zod';
import { cards } from '../../lib/cards';
import { trpc } from '../../lib/trpc';

export const getCardTrpcRoute = trpc.procedure
  .input(
    z.object({
      cardNick: z.string(),
    }),
  )
  .query(({ input }) => {
    const card = cards.find((card) => card.nick === input.cardNick);
    return { card: card || null };
  });
