import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { trpcRouter } from './router/index.js';
import { applyTrpcToExpressApp } from './lib/trpcExpress.js';
import path from 'path';
import uploadRouter from './router/upload.js';

export type { TrpcRouter } from './router/index.js';

const PORT = Number(process.env.PORT ?? 3000);
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:5173',
];

const bootstrap = async () => {
  const app = express();

  // Static file serving for local image storage.
// Required when IMAGE_STORAGE=local.
  app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

  app.use(
    cors({
      origin: process.env.NODE_ENV === 'production' ? ALLOWED_ORIGINS : true,
      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.use(uploadRouter);

  app.get('/ping', (_req, res) => {
    res.send('pong');
  });

  applyTrpcToExpressApp(app, trpcRouter);

  const server = app.listen(PORT, () => {
    console.info(`Server is running at http://localhost:${PORT}`);
  });

  server.on('error', (error) => {
    console.error('Server failed to start:', error);
    process.exit(1);
  });
};

void bootstrap();
