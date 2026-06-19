import { GiCastle, GiBroadsword, GiLaurelsTrophy } from 'react-icons/gi';

import { FaUsers } from 'react-icons/fa';

import css from './index.module.scss';

const items = [
  {
    icon: <GiCastle />,
    title: 'Историчность',
    description:
      'Публикация миниатюр различных эпох с сохранением исторической достоверности.',
  },

  {
    icon: <GiBroadsword />,
    title: 'Мастерство',
    description: 'Демонстрация техники росписи, конверсий и создания диорам.',
  },

  {
    icon: <GiLaurelsTrophy />,
    title: 'Вдохновение',
    description: 'Обмен идеями, работами и творческими подходами.',
  },

  {
    icon: <FaUsers />,
    title: 'Сообщество',
    description:
      'Объединение коллекционеров и художников исторической миниатюры.',
  },
];

export const HomeFeatures = () => {
  return (
    <section className={css.features}>
      {items.map((item) => (
        <article key={item.title} className={css.card}>
          <div className={css.icon}>{item.icon}</div>

          <h3 className={css.title}>{item.title}</h3>

          <p className={css.description}>{item.description}</p>
        </article>
      ))}
    </section>
  );
};
