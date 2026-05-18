import { z } from 'zod';
import { cards } from '../../lib/cards';
import { trpc } from '../../lib/trpc';

export const createCardTrpcRoute = trpc.procedure
  .input(
    z.object({
      title: z.string().min(1, 'Поле не заполнено'),

      historicalPeriod: z.string().min(1, 'Поле не заполнено'),

      authorNick: z
        .string()
        .min(1, 'Поле не заполнено')
        .regex(
          /^[a-z0-9-]+$/,
          'Nick автора может содержать только строчные латинские буквы, цифры и дефис',
        ),

      authorName: z
        .string()
        .min(1, 'Поле не заполнено')
        .refine(
          (value) =>
            /^([A-ZА-ЯЁ][a-zа-яё]+)(\s[A-ZА-ЯЁ][a-zа-яё]+)*$/u.test(value),
          {
            message: 'Имя и фамилия должны начинаться с заглавной буквы',
          },
        ),

      description: z
        .string()
        .min(1, 'Поле не заполнено')
        .max(5000, 'Поле должно содержать не больше 5000 символов'),
    }),
  )
  .mutation(({ input }) => {
    cards.unshift({
      ...input,
      nick: `card-${Date.now()}`,
    });

    return true;
  });
