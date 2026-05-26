import { cards, type Card } from '../../lib/cards';

import { trpc } from '../../lib/trpc';

import { zCreateCardTrpcInput } from './input';

import { randomUUID } from 'crypto';

import { slugify } from 'transliteration';

export const createCardTrpcRoute = trpc.procedure
  .input(zCreateCardTrpcInput)
  .mutation(({ input }) => {
    const validatedInput = zCreateCardTrpcInput.parse(input) as Card;

    const slug = `${slugify(validatedInput.title, {
      lowercase: true,
      separator: '-',
    })}-${randomUUID().split('-')[0]}`;

    const newCard: Card = {
      ...validatedInput,
      slug,
    };

    cards.unshift(newCard);

    return true;
  });