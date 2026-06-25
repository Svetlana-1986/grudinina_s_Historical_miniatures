import { verifyPassword } from '../../utils/password.js';

import { trpc } from '../../lib/trpc.js';

import { zSignInTrpcInput } from './input.js';

import { generateSessionToken } from '../../utils/generateSessionToken.js';



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

    const passwordMatches = await verifyPassword(
      input.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new Error('Неверный логин или пароль');
    }

    const sessionToken = generateSessionToken();

    await ctx.prisma.session.create({
      data: {
        token: sessionToken,

        userId: user.id,

        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    });

    ctx.res.cookie('sessionToken', sessionToken, {
      httpOnly: true,

      secure: false,

      sameSite: 'lax',

      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    return {
      success: true,
      userId: user.id,
      nick: user.nick,
    };
  });
