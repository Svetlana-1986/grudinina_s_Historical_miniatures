import { z } from 'zod';
import { HistoricalPeriod } from '@prisma/client';

export const zCreateCardTrpcInput = z.object({
  title: z.string().min(1),

  historicalPeriod: z.nativeEnum(HistoricalPeriod),

  description: z
    .string()
    .min(1, 'Поле не заполнено')
    .max(5000, 'Поле должно содержать не больше 5000 символов'),

  coverImage: z.string().optional(),

  images: z.array(z.string()).default([]),
});

export type CreateCardInput = z.infer<typeof zCreateCardTrpcInput>;
