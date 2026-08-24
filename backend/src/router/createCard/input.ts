import { z } from 'zod';
import { HistoricalPeriod } from '../../shared/historicalPeriod.js';

const TITLE_MAX_LENGTH = 150;
const DESCRIPTION_MAX_LENGTH = 5000;

export const zCreateCardTrpcInput = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(TITLE_MAX_LENGTH),

  historicalPeriod: z.enum([
    HistoricalPeriod.ANCIENT,
    HistoricalPeriod.MIDDLE_AGES,
    HistoricalPeriod.NAPOLEONIC_WARS,
    HistoricalPeriod.WORLD_WAR_1,
    HistoricalPeriod.WORLD_WAR_2,
    HistoricalPeriod.FANTASY,
    HistoricalPeriod.OTHER,
  ]),

  description: z.string().trim().max(DESCRIPTION_MAX_LENGTH),

  coverImage: z.string().url().optional(),

  coverImagePreview: z.string().url().optional(),

  coverImageHero: z.string().url().optional(),

  images: z.array(z.string().url()).default([]),
});

export type CreateCardInput = z.infer<typeof zCreateCardTrpcInput>;
