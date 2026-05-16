import { trpc } from '../lib/trpc';
import { getCardTrpcRoute } from './getCard';
import { getCardsTrpcRoute } from './getCards';

export const trpcRouter = trpc.router({
  getCard: getCardTrpcRoute,
  getCards: getCardsTrpcRoute,
});

// типы автоматически “протекают” на клиент, на frontend
export type TrpcRouter = typeof trpcRouter;
