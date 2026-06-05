import { z } from 'zod';

export const zCreateCardTrpcInput = z.object({
  title: z.string().min(1, 'Поле не заполнено'),

  historicalPeriod: z.string().min(1, 'Поле не заполнено'),

  description: z
    .string()
    .min(1, 'Поле не заполнено')
    .max(5000, 'Поле должно содержать не больше 5000 символов'),
});

export type CreateCardInput = z.infer<typeof zCreateCardTrpcInput>;
