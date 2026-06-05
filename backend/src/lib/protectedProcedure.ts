import { TRPCError } from '@trpc/server';

import { trpc } from './trpc.js';

import { getCurrentUser } from '../utils/getCurrentUser.js';

export const protectedProcedure = trpc.procedure.use(async ({ ctx, next }) => {
  const user = await getCurrentUser(ctx);

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
