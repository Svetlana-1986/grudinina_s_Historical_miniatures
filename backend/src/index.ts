import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { trpcRouter } from './router/index.js';
import { applyTrpcToExpressApp } from './lib/trpcExpress.js';

export type { TrpcRouter } from './router/index.js';

const bootstrap = async () => {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5173',

      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.get('/ping', (_req, res) => {
    res.send('pong');
  });

  applyTrpcToExpressApp(app, trpcRouter);

  app.listen(3000, () => {
    console.info('Listening at http://localhost:3000');
  });
};

void bootstrap();
