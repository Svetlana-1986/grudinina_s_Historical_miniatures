import { trpc } from '../../lib/trpc';

import { Segment } from '../../components/Segment';

import { CardPreview } from '../../components/CardPreview';

import css from './index.module.scss';

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
    <Segment title="Галерея" size={2}>
      <div className={css.cards}>
        {data.cards.map((card) => (
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
  );
};
