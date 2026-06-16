import { Segment } from '../../components/Segment';
import { trpc } from '../../lib/trpc';

import { CardPreview } from '../../components/CardPreview';
import css from './index.module.scss';

export const ProfilePage = () => {
  const { data: user, isLoading } = trpc.me.useQuery();
  const { data: cards, isLoading: cardsLoading } = trpc.getMyCards.useQuery();

  if (isLoading) {
    return <Segment title="Профиль">Загрузка...</Segment>;
  }

  if (!user) {
    return <Segment title="Профиль">Пользователь не найден</Segment>;
  }

  return (
    <Segment title="Профиль" size={2}>
      <div className={css.profile}>
        <div className={css.infoCard}>
          <div className={css.label}>Никнейм</div>

          <div className={css.value}>{user.nick}</div>
        </div>

        <div className={css.tabs}>
          <button className={css.activeTab}>Мои публикации</button>

          <button className={css.tab}>Избранное</button>

          <button className={css.tab}>Настройки</button>
        </div>

        <div className={css.section}>
          <div className={css.sectionTitle}>
            Мои публикации ({cards?.length ?? 0})
          </div>

          {cardsLoading ? (
            <div className={css.empty}>Загрузка публикаций...</div>
          ) : cards?.length ? (
            <div className={css.cards}>
              {cards.map((card) => (
                <CardPreview
                  key={card.id}
                  id={card.id}
                  slug={card.slug}
                  title={card.title}
                  historicalPeriod={card.historicalPeriod}
                  createdAt={card.createdAt}
                  author={user.nick}
                  coverImage={card.coverImage}
                />
              ))}
            </div>
          ) : (
            <div className={css.empty}>У вас пока нет публикаций</div>
          )}
        </div>
      </div>
    </Segment>
  );
};
