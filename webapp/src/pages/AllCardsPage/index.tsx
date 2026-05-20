import { trpc } from '../../lib/trpc';
import { Link } from 'react-router-dom';
import { getViewCardPageRoute } from '../../lib/routes';
import css from './index.module.scss';
import { Segment } from '../../components/Segment';

export const AllCardsPage = () => {
  const { data, error, isLoading, isFetching, isError } =
    trpc.getCards.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <span>No data</span>;
  }

  return (
    <Segment title="Все миниатюры">
      <div className={css.cards}>
        {data.cards.map((card) => (
          <div className={css.card} key={card.slug}>
            <Segment
              size={2}
              title={
                <Link
                  className={css.cardLink}
                  to={getViewCardPageRoute({ cardSlug: card.slug })}
                >
                  {card.title}
                </Link>
              }
            >
              <p className={css.cardMeta}>Период: {card.historicalPeriod}</p>

              <p className={css.cardMeta}>Nick автора: {card.authorNick}</p>

              <p className={css.cardMeta}>Имя автора: {card.authorName}</p>
            </Segment>
          </div>
        ))}
      </div>
    </Segment>
  );
};
