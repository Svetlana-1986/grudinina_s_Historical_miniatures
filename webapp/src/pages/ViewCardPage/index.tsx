import { useParams } from 'react-router-dom';
import { type ViewCardPageRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';

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
      <h1 className={css.title}>{data.card.title} </h1>
      <p className={css.description}>{data.card.historicalPeriod}</p>
      <p className={css.description}>{data.card.author}</p>
      <div>
        <p className={css.description}>{data.card.description}</p>
      </div>
      <div
        className={css.text}
        dangerouslySetInnerHTML={{ __html: data?.card.text }}
      />
    </div>
  );
};
