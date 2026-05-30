import express from 'express';

import * as trpcExpress from '@trpc/server/adapters/express';

import type { AnyRouter } from '@trpc/server';

import type { AppContext } from './ctx.js';

export const applyTrpcToExpressApp = (
  app: express.Express,
  ctx: AppContext,
  router: AnyRouter,
) => {
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router,
      createContext: () => ctx,
    }),
  );
};
