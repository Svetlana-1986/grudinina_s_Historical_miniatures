import { zCreateCardTrpcInput } from './input.js';

import { protectedProcedure } from '../../lib/protectedProcedure.js';

import { randomUUID } from 'crypto';

import { slugify } from 'transliteration';

export const createCardTrpcRoute = protectedProcedure
  .input(zCreateCardTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const slug = `${slugify(input.title, {
      lowercase: true,
      separator: '-',
    })}-${randomUUID().split('-')[0]}`;

    const existingCard = await ctx.prisma.card.findUnique({
      where: {
        slug,
      },
    });

    if (existingCard) {
      throw new Error('Карточка уже существует');
    }

    const currentUser = ctx.user;

    const createdCard = await ctx.prisma.card.create({
      data: {
        slug,

        title: input.title,

        historicalPeriod: input.historicalPeriod,

        description: input.description,

        coverImage: input.coverImage,

        coverImagePreview: input.coverImagePreview,

        coverImageHero: input.coverImageHero,

        images: {
          create: input.images.map((imageUrl, index) => ({
            imageUrl,

            position: index,
          })),
        },

        authorId: currentUser.id,
      },
    });

    return createdCard;
  });
