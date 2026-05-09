import { useParams } from 'react-router-dom';
import { type ViewCardPageRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const ViewCardPage = () => {
  const { cardNick } = useParams() as ViewCardPageRouteParams;
  // получение card с backend
  const { data, error, isLoading, isFetching, isError } = trpc.getCard.useQuery(
    { cardNick },
  );

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data || !data.card) {
    return <span>Cards not found</span>;
  }

  return (
    <div>
      <h1>{data.card.title} </h1>
      <p>{data.card.historicalPeriod}</p>
      <p>{data.card.author}</p>
      <div>
        <p>{data.card.description}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.card.text }} />
    </div>
  );
};
