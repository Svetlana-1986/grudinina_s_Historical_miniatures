import { HistoricalPeriod } from '@prisma/client';

export const historicalPeriodLabels: Record<HistoricalPeriod, string> = {
  [HistoricalPeriod.ANCIENT]: 'Древний мир',

  [HistoricalPeriod.MIDDLE_AGES]: 'Средневековье',

  [HistoricalPeriod.NAPOLEONIC_WARS]: 'Наполеоновские войны',

  [HistoricalPeriod.WORLD_WAR_1]: 'Первая мировая война',

  [HistoricalPeriod.WORLD_WAR_2]: 'Вторая мировая война',

  [HistoricalPeriod.FANTASY]: 'Фэнтези',

  [HistoricalPeriod.OTHER]: 'Иное',
};

export const historicalPeriodOptions = Object.values(HistoricalPeriod).map(
  (period) => ({
    value: period,
    label: historicalPeriodLabels[period],
  }),
);
