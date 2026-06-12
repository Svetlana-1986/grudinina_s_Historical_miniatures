import { trpc } from '../../lib/trpc.js';

import { getCurrentUser } from '../../utils/getCurrentUser.js';

export const meTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const user = await getCurrentUser(ctx);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    nick: user.nick,
    createdAt: user.createdAt,
  };
});
