import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { trpc } from '../../lib/trpc.js';


export const getCardTrpcRoute = trpc.procedure
  .input(
    z.object({
      cardSlug: z.string().min(1),
    }),
  )
  .query(async ({ ctx, input }) => {
    const card = await ctx.prisma.card.findUnique({
      where: {
        slug: input.cardSlug,
      },

      include: {
        author: true,

        images: {
          orderBy: {
            position: 'asc',
          },
        },
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

