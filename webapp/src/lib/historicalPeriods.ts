export const historicalPeriodLabels = {
  ANCIENT: 'Древний мир',

  MIDDLE_AGES: 'Средневековье',

  NAPOLEONIC_WARS: 'Наполеоновские войны',

  WORLD_WAR_1: 'Первая мировая война',

  WORLD_WAR_2: 'Вторая мировая война',

  FANTASY: 'Фэнтези',

  OTHER: 'Иное',
} as const;

export const historicalPeriodOptions = Object.entries(
  historicalPeriodLabels,
).map(([value, label]) => ({
  value,
  label,
}));
