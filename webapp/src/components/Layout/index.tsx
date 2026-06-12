import { Link, Outlet } from 'react-router-dom';

import {
  getAllCardsPageRoute,
  getMainCardPageRoute,
  getBlogRoutePage,
  getSignUpRoutePage,
  getSignInRoutePage,
} from '../../lib/routes';

import logo from '../../assets/logo.png';

import css from './index.module.scss';

import { useAuth } from '../../hooks/useAuth';

import { UserMenu } from '../UserMenu';

import { useState } from 'react';

export const Layout = () => {
  const { isAuthorized, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={css.layout}>
      <header className={css.header}>
        <div className={css.container}>
          <Link to={getMainCardPageRoute()} className={css.brand}>
            <img src={logo} alt="HISTORIUM" className={css.logoImage} />

            <div className={css.logo}>
              <div className={css.logoTitle}>HISTORIUM</div>

              <div className={css.logoSubtitle}>
                <span>Военно-историческая</span>

                <span>миниатюра</span>
              </div>
            </div>
          </Link>

          <nav
            className={`${css.nav} ${mobileMenuOpen ? css.navigationOpen : ''}`}
          >
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
                <Link className={css.link} to={getBlogRoutePage()}>
                  Блог
                </Link>
              </li>
            </ul>
          </nav>

          <div className={css.auth}>
            {isAuthorized ? (
              <UserMenu nick={user?.nick} />
            ) : (
              <>
                <Link className={css.link} to={getSignInRoutePage()}>
                  Войти
                </Link>

                <Link className={css.registerLink} to={getSignUpRoutePage()}>
                  Регистрация
                </Link>
              </>
            )}
          </div>

          <button
            className={css.burger}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
          {mobileMenuOpen && (
            <div className={css.mobileMenu}>
              <Link
                className={css.mobileLink}
                to={getMainCardPageRoute()}
                onClick={() => setMobileMenuOpen(false)}
              >
                Главная
              </Link>

              <Link
                className={css.mobileLink}
                to={getAllCardsPageRoute()}
                onClick={() => setMobileMenuOpen(false)}
              >
                Галерея
              </Link>

              <Link
                className={css.mobileLink}
                to={getBlogRoutePage()}
                onClick={() => setMobileMenuOpen(false)}
              >
                Блог
              </Link>

              {isAuthorized ? (
                <>
                  <div className={css.mobileSeparator} />

                  <div className={css.mobileUser}>{user?.nick}</div>

                  <Link
                    className={css.mobileLink}
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Профиль
                  </Link>

                  <Link
                    className={css.mobileLink}
                    to="/new-card"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Создать публикацию
                  </Link>
                </>
              ) : (
                <>
                  <div className={css.mobileSeparator} />

                  <Link
                    className={css.mobileLink}
                    to={getSignInRoutePage()}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Войти
                  </Link>

                  <Link
                    className={css.mobileRegister}
                    to={getSignUpRoutePage()}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          )}
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
