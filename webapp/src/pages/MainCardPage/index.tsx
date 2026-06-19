import { Link } from 'react-router-dom';

import { Segment } from '../../components/Segment';
import { CardPreview } from '../../components/CardPreview';
import { trpc } from '../../lib/trpc';
import { HomeFeatures } from '../../components/HomeFeatures';

import css from './index.module.scss';

export const MainCardPage = () => {
  const { data } = trpc.getCards.useQuery();

  const latestCards = data?.cards.slice(0, 6) ?? [];

  return (
    <div className={css.page}>
      <section className={css.hero}>
        <img
          src="images/hero.png"
          alt="История в миниатюре"
          className={css.heroImage}
        />

        <div className={css.overlay}>
          <h1 className={css.title}>
            <span className={css.titleAccent}>ИСТОРИЯ</span>

            <span className={css.titleMain}>В МИНИАТЮРЕ</span>
          </h1>

          <p className={css.subtitle}>
            Военно-историческая миниатюра — это искусство, которое объединяет
            историю, творчество и мастерство. Создавайте, коллекционируйте,
            вдохновляйтесь!
          </p>

          <div className={css.heroButtons}>
            <Link to="/allcards" className={css.heroButtonPrimary}>
              В ГАЛЕРЕЮ
            </Link>

            <a href="/about" className={css.heroButtonSecondary}>
              О ПРОЕКТЕ
            </a>
          </div>
        </div>
      </section>

      <HomeFeatures />

      <Segment title="Последние публикации" centerTitle size={2}>
        <div className={css.cards}>
          {latestCards.map((card) => (
            <CardPreview
              key={card.id}
              id={card.id}
              slug={card.slug}
              title={card.title}
              historicalPeriod={card.historicalPeriod}
              createdAt={card.createdAt}
              author={card.author?.nick}
              coverImagePreview={card.coverImagePreview}
            />
          ))}
        </div>
      </Segment>
    </div>
  );
};
