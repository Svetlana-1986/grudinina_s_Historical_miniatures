import { zCreateCardTrpcInput } from './input.js';
import { protectedProcedure } from '../../lib/protectedProcedure.js';
import { generateCardSlug } from '../../utils/generateCardSlug.js';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const createCardTrpcRoute = protectedProcedure
  .input(zCreateCardTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const slug = generateCardSlug(input.title);
    const currentUser = ctx.user;

    try {
      const createdCard = await ctx.prisma.card.create({
        data: {
          slug,
          title: input.title,
          historicalPeriod: input.historicalPeriod,
          description: input.description,
          coverImage: input.coverImage,
          coverImagePreview: input.coverImagePreview,
          coverImageHero: input.coverImageHero,
          images: {
            create: input.images.map((imageUrl, index) => ({
              imageUrl,
              position: index,
            })),
          },
          authorId: currentUser.id,
        },
      });

      return createdCard;
    } catch (error) {
      // Перехватываем ошибку нарушения уникального констрейнта P2002 в Prisma
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Карточка с таким slug уже существует',
        });
      }

      // Пробрасываем остальные системные ошибки дальше
      console.error('[CreateCard] Ошибка создания карточки', error);
      throw error;
    }
  });
