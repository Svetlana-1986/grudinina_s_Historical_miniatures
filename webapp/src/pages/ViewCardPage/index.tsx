import { useParams } from 'react-router-dom';
import { type ViewCardPageRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';
import { Segment } from '../../components/Segment';

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
    <Segment title={data.card.title}>
      <div className={css.meta}>
        <p className={css.metaItem}>Период: {data.card.historicalPeriod}</p>

        <p className={css.metaItem}>Nick автора: {data.card.authorNick}</p>

        <p className={css.metaItem}>Имя автора: {data.card.authorName}</p>
      </div>

      <div className={css.description}>{data.card.description}</div>

      {data.card.text && (
        <div
          className={css.text}
          dangerouslySetInnerHTML={{ __html: data.card.text }}
        />
      )}
    </Segment>
  );
};
