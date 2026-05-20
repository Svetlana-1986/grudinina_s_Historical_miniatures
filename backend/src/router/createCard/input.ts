import { z } from 'zod';

export const zCreateCardTrpcInput = z.object({
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
      (value) => /^([A-ZА-ЯЁ][a-zа-яё]+)(\s[A-ZА-ЯЁ][a-zа-яё]+)*$/u.test(value),
      {
        message: 'Имя и фамилия должны начинаться с заглавной буквы',
      },
    ),

  description: z
    .string()
    .min(1, 'Поле не заполнено')
    .max(5000, 'Поле должно содержать не больше 5000 символов'),
});

export type CreateCardInput = z.infer<typeof zCreateCardTrpcInput>;
