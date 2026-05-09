import { trpc } from '../../lib/trpc';
import { Link } from 'react-router-dom';
import { getViewCardPageRoute } from '../../lib/routes';

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
    <div>
      <h1>Все миниатюры</h1>
      {data.cards.map((card) => (
        <div key={card.nick}>
          <h2>
            <Link to={getViewCardPageRoute({ cardNick: card.nick })}>
              {card.title}
            </Link>
          </h2>
          <p>{card.historicalPeriod}</p>
          <p>{card.author}</p>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};
