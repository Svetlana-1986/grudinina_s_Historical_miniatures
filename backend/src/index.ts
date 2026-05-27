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

// import express from 'express';
// import { trpcRouter } from './router';
// import { applyTrpcToExpressApp } from './lib/trpc';
// import cors from 'cors';
// import { AppContext, createAppContext } from './lib/ctx';
// export type { TrpcRouter } from './router';

// void (async () => {
//   let ctx: AppContext | null = null;
//   try {
//     ctx = createAppContext();
//     const expressApp = express();
//     expressApp.use(cors());
//     expressApp.get('/ping', (_req, res) => {
//       res.send('pong');
//     });

//     applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

//     expressApp.listen(3000, () => {
//       console.info('Listening at http://localhost:3000');
//     });
//   } catch (error) {
//     console.error(error);
//     await ctx?.stop();
//   }
// })();
