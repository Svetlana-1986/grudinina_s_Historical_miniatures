import { cards } from '../../lib/cards';
import { trpc } from '../../lib/trpc';
import { zCreateCardTrpcInput } from './input';
import { slugify } from 'transliteration';

export const createCardTrpcRoute = trpc.procedure
  .input(zCreateCardTrpcInput)
  .mutation(({ input }) => {
    const slug =
      slugify(input.title, {
        lowercase: true,
        separator: '-',
      }) +
      '-' +
      Date.now();

    cards.unshift({
      ...input,
      slug,
    });

    return true;
  });
