import { z } from 'zod';
import { cards } from '../../lib/cards';
import { trpc } from '../../lib/trpc';

export const getCardTrpcRoute = trpc.procedure
  .input(
    z.object({
      cardSlug: z.string(),
    }),
  )
  .query(({ input }) => {
    const card = cards.find((card) => card.slug === input.cardSlug);
    return { card: card || null };
  });
