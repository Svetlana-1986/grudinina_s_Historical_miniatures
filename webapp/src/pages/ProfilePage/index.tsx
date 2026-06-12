// import { Link } from 'react-router-dom';

import { Segment } from '../../components/Segment';
// import { Button } from '../../components/Button';
// import { SignOutButton } from '../../components/SignOutButton';

import { trpc } from '../../lib/trpc';

// import { getNewCardPageRoute } from '../../lib/routes';

import css from './index.module.scss';

export const ProfilePage = () => {
  const { data: user, isLoading } = trpc.me.useQuery();

  if (isLoading) {
    return <Segment title="Профиль">Загрузка...</Segment>;
  }

  if (!user) {
    return <Segment title="Профиль">Пользователь не найден</Segment>;
  }

  return (
    <Segment title="Профиль">
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

        <div className={css.section}>Здесь будут карточки пользователя</div>
      </div>
    </Segment>
  );
};
