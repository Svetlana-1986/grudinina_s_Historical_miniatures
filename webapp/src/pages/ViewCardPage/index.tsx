import { useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { type ViewCardPageRouteParams } from '../../lib/routes';

import { trpc } from '../../lib/trpc';

import { historicalPeriodLabels } from '../../lib/historicalPeriods';

import css from './index.module.scss';

export const ViewCardPage = () => {
  const params = useParams<ViewCardPageRouteParams>();

  const cardSlug = params.cardSlug;

  if (!cardSlug) {
    return <div>Некорректный адрес карточки</div>;
  }

  const { data, error, isLoading } = trpc.getCard.useQuery({
    cardSlug,
  });

  if (isLoading) {
    return <div>Загрузка карточки...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки карточки</div>;
  }

  if (!data?.card) {
    return <div>Карточка не найдена</div>;
  }

  const card = data.card;

  return (
    <div className={css.page}>
      <section className={css.hero}>
        <div className={css.period}>
          {historicalPeriodLabels[card.historicalPeriod]}
        </div>

        <h1 className={css.title}>{card.title}</h1>

        <div className={css.meta}>
          <div>
            Автор: <span>{card.author.displayName}</span>
          </div>

          <div>
            Ник: <span>{card.author.nick}</span>
          </div>

          <div>
            Опубликовано:{' '}
            <span>
              {format(card.createdAt, 'dd MMMM yyyy', {
                locale: ru,
              })}
            </span>
          </div>
        </div>
      </section>

      <section className={css.content}>
        <div className={css.description}>{card.description}</div>
      </section>
    </div>
  );
};
