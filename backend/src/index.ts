import express from 'express';
import cors from 'cors';

import { trpcRouter } from './router';
import { applyTrpcToExpressApp } from './lib/trpcExpress';
import { createAppContext } from './lib/ctx';

export type { TrpcRouter } from './router';

const bootstrap = async () => {
  const app = express();

  app.use(cors());

  app.get('/ping', (_req, res) => {
    res.send('pong');
  });

  applyTrpcToExpressApp(app, createAppContext(), trpcRouter);

  app.listen(3000, () => {
    console.info('Listening at http://localhost:3000');
  });
};

void bootstrap();
 