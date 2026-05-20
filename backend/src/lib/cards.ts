export type Card = {
  slug: string;
  title: string;
  historicalPeriod: string;
  authorNick: string;
  authorName: string;
  description: string;
};

export const cards: Card[] = [
  {
    slug: 'napoleon-guard',
    title: 'Гренадер Старой Гвардии',
    historicalPeriod: 'Наполеоновские войны',
    authorNick: 'miniart',
    authorName: 'Иван Петров',
    description: 'Миниатюра французского гренадера Императорской гвардии.',
  },

  {
    slug: 'roman-legionary',
    title: 'Римский легионер',
    historicalPeriod: 'Древний Рим',
    authorNick: 'roma-art',
    authorName: 'Александр Иванов',
    description: 'Миниатюра легионера периода поздней Римской республики.',
  },
];
