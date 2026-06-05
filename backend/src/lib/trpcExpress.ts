import express from 'express';

import * as trpcExpress from '@trpc/server/adapters/express';

import type { AnyRouter } from '@trpc/server';

import { createAppContext } from './ctx.js';

export const applyTrpcToExpressApp = (
  app: express.Express,
  router: AnyRouter,
) => {
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router,

      createContext: ({ req, res }) =>
        createAppContext({
          req,
          res,
        }),
    }),
  );
};
