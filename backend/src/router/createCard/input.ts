import { z } from 'zod';
import { HistoricalPeriod } from '@prisma/client';

export const zCreateCardTrpcInput = z.object({
  title: z.string().min(1),

  historicalPeriod: z.nativeEnum(HistoricalPeriod),

  description: z.string(),

  coverImage: z.string().optional(),

  coverImagePreview: z.string().optional(),

  coverImageHero: z.string().optional(),

  images: z.array(z.string()).default([]),
});

export type CreateCardInput = z.infer<typeof zCreateCardTrpcInput>;
