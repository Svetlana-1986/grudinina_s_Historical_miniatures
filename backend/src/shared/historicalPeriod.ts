export const HistoricalPeriod = {
  ANCIENT: 'ANCIENT',
  MIDDLE_AGES: 'MIDDLE_AGES',
  NAPOLEONIC_WARS: 'NAPOLEONIC_WARS',
  WORLD_WAR_1: 'WORLD_WAR_1',
  WORLD_WAR_2: 'WORLD_WAR_2',
  FANTASY: 'FANTASY',
  OTHER: 'OTHER',
} as const;

export type HistoricalPeriod =
  (typeof HistoricalPeriod)[keyof typeof HistoricalPeriod];