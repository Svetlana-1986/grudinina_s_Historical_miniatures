import { Link } from 'react-router-dom';

import { getViewCardPageRoute } from '../../lib/routes';

import type { HistoricalPeriod } from '@prisma/client';

import { historicalPeriodLabels } from '../../lib/historicalPeriods';

import css from './index.module.scss';

type Props = {
  id: string;
  slug: string;
  title: string;
  historicalPeriod: HistoricalPeriod;
  author?: string;
  createdAt: string | Date;
};

export const CardPreview = ({
  slug,
  title,
  historicalPeriod,
  author,
  createdAt,
}: Props) => {
  return (
    <Link
      className={css.card}
      to={getViewCardPageRoute({
        cardSlug: slug,
      })}
    >
      <div className={css.badge}>
        {historicalPeriodLabels[historicalPeriod]}
      </div>

      <h3 className={css.title}>{title}</h3>

      <div className={css.footer}>
        <div className={css.author}>{author}</div>

        <div className={css.date}>
          {new Date(createdAt).toLocaleDateString('ru-RU')}
        </div>
      </div>
    </Link>
  );
};
