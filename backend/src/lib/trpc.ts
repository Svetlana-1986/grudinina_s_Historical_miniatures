import { initTRPC } from '@trpc/server';
import type { AppContext } from './ctx';

export const trpc = initTRPC.context<AppContext>().create();




// import { initTRPC } from '@trpc/server';
// import * as trpcExpress from '@trpc/server/adapters/express';
// import { type Express } from 'express';
// import { type TrpcRouter } from '../router';
// import { AppContext } from './ctx';

// // инициализируем
// export const trpc = initTRPC.context<AppContext>().create();

// export const applyTrpcToExpressApp = (
//   expressApp: Express,
//   appContext: AppContext,
//   trpcRouter: TrpcRouter,
// ) => {
//   expressApp.use(
//     '/trpc',
//     trpcExpress.createExpressMiddleware({
//       router: trpcRouter,
//       createContext: () => appContext,
//     }),
//   );
// };
