import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { type ViewCardPageRouteParams } from '../../lib/routes';

import { trpc } from '../../lib/trpc';

import { historicalPeriodLabels } from '../../lib/historicalPeriods';

import css from './index.module.scss';

import Lightbox from 'yet-another-react-lightbox';

import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';

import Download from 'yet-another-react-lightbox/plugins/download';

import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import 'yet-another-react-lightbox/styles.css';

import 'yet-another-react-lightbox/plugins/thumbnails.css';

export const ViewCardPage = () => {
  const params = useParams<ViewCardPageRouteParams>();

  const cardSlug = params.cardSlug;

  const [open, setOpen] = useState(false);

  const [index, setIndex] = useState(0);

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
        {card.coverImage && (
          <div className={css.coverWrapper}>
            <img
              src={`http://localhost:3000${card.coverImage}`}
              alt={card.title}
              className={css.coverImage}
            />
          </div>
        )}
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

        {card.images.length > 0 && (
          <section className={css.gallery}>
            {card.images.map((image, imageIndex) => (
              <div
                key={image.id}
                className={css.galleryItem}
                onClick={() => {
                  setIndex(imageIndex);
                  setOpen(true);
                }}
              >
                <img
                  src={`http://localhost:3000${image.imageUrl}`}
                  alt={card.title}
                />
              </div>
            ))}
          </section>
        )}
      </section>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        plugins={[Zoom, Fullscreen, Download, Thumbnails]}
        zoom={{
          maxZoomPixelRatio: 4,
          scrollToZoom: true,
        }}
        thumbnails={{
          position: 'bottom',
          width: 100,
          height: 70,
          border: 1,
          borderRadius: 8,
        }}
        slides={card.images.map((image) => ({
          src: `http://localhost:3000${image.imageUrl}`,
          download: `http://localhost:3000${image.imageUrl}`,
        }))}
      />
    </div>
  );
};
