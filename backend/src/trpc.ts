import { initTRPC } from '@trpc/server';
import _ from 'lodash';
import { z } from 'zod';

// генерирует карточки с 0 до 99 - библиотека lodash
const cards = _.times(100, (i) => ({
  nick: `card-${i}`,
  title: `Миниатюра ${i}`,
  historicalPeriod: 'Исторический период',
  author: 'Имя автора',
  description: `Описание Миниатюра ${i}`,
  text: _.times(100, (j) => `<p>Текст ${j} миниатюра ${i}...</p>`).join(''),
}));

// инициализируем
const trpc = initTRPC.create();

// создаем роутер,который возвращает инфу с backend
export const trpcRouter = trpc.router({
  getCards: trpc.procedure.query(() => {
    // покажет только эти строки
    return {
      cards: cards.map((card) =>
        _.pick(card, [
          'nick',
          'title',
          'historicalPeriod',
          'author',
          'description',
        ]),
      ),
    };
  }),
  getCard: trpc.procedure
    .input(
      z.object({
        cardNick: z.string(),
      }),
    )
    .query(({ input }) => {
      const card = cards.find((card) => card.nick === input.cardNick);
      return { card: card || null };
    }),
});

// типы автоматически “протекают” на клиент, на frontend
export type TrpcRouter = typeof trpcRouter;
