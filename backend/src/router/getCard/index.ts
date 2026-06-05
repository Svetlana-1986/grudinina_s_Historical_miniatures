import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { trpc } from '../../lib/trpc.js';

export const getCardTrpcRoute = trpc.procedure
  .input(
    z.object({
      cardSlug: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/),
    }),
  )
  .query(async ({ ctx, input }) => {
    const card = await ctx.prisma.card.findUnique({
      where: {
        slug: input.cardSlug,
      },

      include: {
        author: true,
      },
    });

    if (!card) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Карточка не найдена',
      });
    }

    return {
      card,
    };
  });
