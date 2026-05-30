import { trpc } from '../../lib/trpc.js';

import { zCreateCardTrpcInput } from './input.js';

import { randomUUID } from 'crypto';

import { slugify } from 'transliteration';

export const createCardTrpcRoute = trpc.procedure
  .input(zCreateCardTrpcInput)
  .mutation(async ({ input, ctx }) => {
    // Генерация slug
    const slug = `${slugify(input.title, {
      lowercase: true,
      separator: '-',
    })}-${randomUUID().split('-')[0]}`;

    // Проверка существования slug
    const existingCard = await ctx.prisma.card.findUnique({
      where: {
        slug,
      },
    });

    if (existingCard) {
      throw new Error('Карточка уже существует');
    }

    // Создание записи
    const createdCard = await ctx.prisma.card.create({
      data: {
        slug,
        title: input.title,
        historicalPeriod: input.historicalPeriod,
        authorNick: input.authorNick,
        authorName: input.authorName,
        description: input.description,
      },
    });

    return createdCard;
  });
