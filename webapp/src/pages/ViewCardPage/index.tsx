import { useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { type ViewCardPageRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

import css from './index.module.scss';

import { Segment } from '../../components/Segment';

export const ViewCardPage = () => {
  const params = useParams<ViewCardPageRouteParams>();
  const cardSlug = params.cardSlug;

  if (!cardSlug) {
    return <span>Invalid route</span>;
  }

  const { data, error, isLoading } = trpc.getCard.useQuery(
    { cardSlug },
    { enabled: !!cardSlug },
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Ошибка загрузки карточки</span>;
  }

  if (!data?.card) {
    return <span>Cards not found</span>;
  }

  const formattedDate = format(data.card.createdAt, 'dd.MM.yyyy', {
    locale: ru,
  });

  return (
    <Segment title={data.card.title}>
      <div className={css.meta}>
        <p className={css.metaItem}>Период: {data.card.historicalPeriod}</p>
        <p className={css.metaItem}>Nick автора: {data.card.author?.nick}</p>
        <p className={css.metaItem}>Имя автора: {data.card.author?.displayName}</p>
      </div>

      <div className={css.createdAt}>Дата создания: {formattedDate}</div>

      <div className={css.description}>{data.card.description}</div>
    </Segment>
  );
};
