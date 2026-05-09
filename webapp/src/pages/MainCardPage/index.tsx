import { Link } from 'react-router-dom';
import { getAllCardsPageRoute, getMainCardPageRoute } from '../../lib/routes';

export const MainCardPage = () => {
  return (
    <div>
      <h1>Historical miniature</h1>
      <h2>
        <Link to={getMainCardPageRoute()}>Главная</Link>
      </h2>
      <h2>
        <Link to={getAllCardsPageRoute()}>Все миниатюры</Link>
      </h2>
      <h2>Регистрация</h2>
      <h2>Контакты</h2>
      <h2>Форум</h2>
    </div>
  );
};
