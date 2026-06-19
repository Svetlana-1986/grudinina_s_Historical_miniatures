import { Link } from 'react-router-dom';

import css from './index.module.scss';

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.contant}>
          <div className={css.logo}>ИСТОРИЯ В МИНИАТЮРЕ</div>

          <div className={css.description}>
            Платформа для публикации военно-исторической миниатюры, диорам и
            коллекционных моделей различных эпох.
          </div>

          <div className={css.links}>
            <Link to="/allcards">Галерея</Link>

            <Link to="/blog">Блог</Link>

            <Link to="/profile">Профиль</Link>

            <Link to="/about">О проекте</Link>
          </div>

          <div className={css.copyright}>
            © 2026 Военно-историческая миниатюра
          </div>
        </div>
      </div>
    </footer>
  );
};
