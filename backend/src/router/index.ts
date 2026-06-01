import { trpc } from '../lib/trpc.js';
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createCardTrpcRoute } from './createCard/index.js';
import { getCardTrpcRoute } from './getCard/index.js';
import { getCardsTrpcRoute } from './getCards/index.js';
import { signInTrpcRoute } from './signIn/index.js';
import { signUpTrpcRoute } from './signUp/index.js';
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createCard: createCardTrpcRoute,
  getCard: getCardTrpcRoute,
  getCards: getCardsTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
});

// типы автоматически “протекают” на клиент, на frontend
export type TrpcRouter = typeof trpcRouter;
