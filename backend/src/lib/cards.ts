import _ from 'lodash';

export type Card = {
  nick: string;
  title: string;
  historicalPeriod: string;
  authorNick: string;
  authorName: string;
  description: string;
  text?: string;
};

// генерирует карточки
export const cards: Card[] = _.times(100, (i) => ({
  nick: `card-${i}`,
  title: `Миниатюра ${i}`,
  historicalPeriod: 'Исторический период',
  authorNick: 'nick',
  authorName: 'Имя автора',
  description: `Описание Миниатюра ${i}`,
  text: _.times(100, (j) => `<p>Текст ${j} миниатюра ${i}...</p>`).join(''),
}));
