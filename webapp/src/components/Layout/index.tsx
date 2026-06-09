import { Link, Outlet } from 'react-router-dom';

import {
  getAllCardsPageRoute,
  getMainCardPageRoute,
  getNewCardPageRoute,
  getBlogRoutePage,
  getSignUpRoutePage,
  getSignInRoutePage,
} from '../../lib/routes';

import logo from '../../assets/logo.png';

import css from './index.module.scss';

export const Layout = () => {
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <div className={css.container}>
          <Link to={getMainCardPageRoute()} className={css.brand}>
            <img src={logo} alt="HISTORIUM" className={css.logoImage} />

            <div className={css.logo}>
              <div className={css.logoTitle}>HISTORIUM</div>

              <div className={css.logoSubtitle}>
                Военно-историческая
                <br />
                миниатюра
              </div>
            </div>
          </Link>

          <nav>
            <ul className={css.menu}>
              <li>
                <Link className={css.link} to={getMainCardPageRoute()}>
                  Главная
                </Link>
              </li>

              <li>
                <Link className={css.link} to={getAllCardsPageRoute()}>
                  Галерея
                </Link>
              </li>

              <li>
                <Link className={css.link} to={getNewCardPageRoute()}>
                  Публикация
                </Link>
              </li>

              <li>
                <Link className={css.link} to={getBlogRoutePage()}>
                  Блог
                </Link>
              </li>

              <li>
                <Link className={css.link} to={getSignUpRoutePage()}>
                  Регистрация
                </Link>
              </li>

              <li>
                <Link className={css.link} to={getSignInRoutePage()}>
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className={css.main}>
        <div className={css.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
