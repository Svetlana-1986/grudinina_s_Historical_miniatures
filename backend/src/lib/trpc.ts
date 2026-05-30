import { initTRPC } from '@trpc/server';

import superjson from 'superjson';

import type { AppContext } from './ctx.js';

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson,
});
