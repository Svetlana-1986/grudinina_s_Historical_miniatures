// Layout Главная, Все миниатюры

import { Link, Outlet } from 'react-router-dom';
import { getAllCardsPageRoute, getMainCardPageRoute } from '../../lib/routes';
import css from './index.module.scss';

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Военно-историческая миниатюра</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getMainCardPageRoute()}>
              Главная
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getAllCardsPageRoute()}>
              Все миниатюры
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getAllCardsPageRoute()}>
              Форум
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getAllCardsPageRoute()}>
              Регистрация
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
    // <div>
    //   <p>
    //     <b className={css.logo}>Военно-историческая миниатюра</b>
    //   </p>
    //   <ul>
    //     <li>
    //       <Link className={css.link} to={getMainCardPageRoute()}>
    //         Главная
    //       </Link>
    //     </li>
    //     <li>
    //       <Link className={css.link} to={getAllCardsPageRoute()}>Все миниатюры</Link>
    //     </li>
    //     <li>
    //       <Link className={css.link} to={getAllCardsPageRoute()}>Форум</Link>
    //     </li>
    //     <li>
    //       <Link className={css.link} to={getAllCardsPageRoute()}>Регистрация</Link>
    //     </li>
    //   </ul>
    //   <hr />
    //   <div>
    //     <Outlet />
    //   </div>
    // </div>
  );
};
