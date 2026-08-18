import { randomUUID } from 'crypto';
import { slugify } from 'transliteration';

// Генерирует уникальный slug для карточки.

export function generateCardSlug(title: string): string {
  const shortId = randomUUID().split('-')[0];
  const normalizedTitle = slugify(title, {
    lowercase: true,
    separator: '-',
  });

  return `${normalizedTitle}-${shortId}`;
}
