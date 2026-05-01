import { trpc } from '../../lib/trpc';

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
      <h1>Военно-историческая миниатюра</h1>
      {data.cards.map((card) => (
        <div key={card.nick}>
          <h2>{card.author}</h2>
          <p>{card.historical_period}</p>
          <p>{card.title}</p>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};
