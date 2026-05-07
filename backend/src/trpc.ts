import { initTRPC } from '@trpc/server';

const cards = [
  {
    nick: 'card-1',
    historical_period: 'period',
    author: 'nickname',
    title: 'Миниатюра-1',
    description: '1',
  },
  {
    nick: 'card-2',
    historical_period: 'period',
    author: 'nickname',
    title: 'Миниатюра-2',
    description: '2',
  },
  {
    nick: 'card-3',
    historical_period: 'period',
    author: 'nickname',
    title: 'Миниатюра-3',
    description: '3',
  },
  {
    nick: 'card-4',
    historical_period: 'period',
    author: 'nickname',
    title: 'Миниатюра-4',
    description: '4',
  },
];

// инициализируем
const trpc = initTRPC.create();

// создаем роутер,который возвращает инфу с backend
export const trpcRouter = trpc.router({
  getCards: trpc.procedure.query(() => {
    return { cards };
  }),
});

// типы автоматически “протекают” на клиент, на frontend
export type TrpcRouter = typeof trpcRouter;
