import { z } from 'zod';
import { HistoricalPeriod } from '../../shared/historicalPeriod.js';

export const zCreateCardTrpcInput = z.object({
  title: z.string().min(1),

  historicalPeriod: z.enum([
  HistoricalPeriod.ANCIENT,
  HistoricalPeriod.MIDDLE_AGES,
  HistoricalPeriod.NAPOLEONIC_WARS,
  HistoricalPeriod.WORLD_WAR_1,
  HistoricalPeriod.WORLD_WAR_2,
  HistoricalPeriod.FANTASY,
  HistoricalPeriod.OTHER,
]),

  description: z.string(),

  coverImage: z.string().optional(),

  coverImagePreview: z.string().optional(),

  coverImageHero: z.string().optional(),

  images: z.array(z.string()).default([]),
});

export type CreateCardInput = z.infer<typeof zCreateCardTrpcInput>;
