import { TRPCError } from '@trpc/server';

import { trpc } from '../../lib/trpc.js';
import { zSignUpTrpcInput } from './input.js';
import { hashPassword } from '../../utils/password.js';

export const signUpTrpcRoute = trpc.procedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const existingUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (existingUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Пользователь с таким именем уже существует',
      });
    }

    // const passwordHash = await bcrypt.hash(input.password, 10);
    const passwordHash = await hashPassword(input.password);

    const user = await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        passwordHash,
      },
    });

    return {
      success: true,
      userId: user.id,
    };
  });
