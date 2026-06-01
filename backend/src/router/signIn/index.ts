// import bcrypt from 'bcrypt';

import { verifyPassword } from '../../utils/password.js';

import { trpc } from '../../lib/trpc.js';

import { zSignInTrpcInput } from './input.js';

export const signInTrpcRoute = trpc.procedure
  .input(zSignInTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (!user) {
      throw new Error('Неверный логин или пароль');
    }

    // const passwordMatches = await bcrypt.compare(
    //   input.password,
    //   user.passwordHash,
    // );

    const passwordMatches = await verifyPassword(
      input.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new Error('Неверный логин или пароль');
    }

    return {
      success: true,
      userId: user.id,
      nick: user.nick,
    };
  });
