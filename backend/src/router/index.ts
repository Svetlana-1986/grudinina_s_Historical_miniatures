import { trpc } from '../lib/trpc';
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createCardTrpcRoute } from './createCard'
import { getCardTrpcRoute } from './getCard'
import { getCardsTrpcRoute } from './getCards'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createCard: createCardTrpcRoute,
  getCard: getCardTrpcRoute,
  getCards: getCardsTrpcRoute,
  // @endindex
});

// типы автоматически “протекают” на клиент, на frontend
export type TrpcRouter = typeof trpcRouter;
