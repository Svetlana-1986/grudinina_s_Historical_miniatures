import _ from 'lodash';

// / генерирует карточки с 0 до 99 - библиотека lodash
export const cards = _.times(100, (i) => ({
  nick: `card-${i}`,
  title: `Миниатюра ${i}`,
  historicalPeriod: 'Исторический период',
  authorNick: 'Nick',
  authorName: 'Имя автора',
  description: `Описание Миниатюра ${i}`,
  text: _.times(100, (j) => `<p>Текст ${j} миниатюра ${i}...</p>`).join(''),
}));
