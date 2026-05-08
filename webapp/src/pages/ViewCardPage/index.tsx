import { useParams } from 'react-router-dom';
import { type ViewCardPageRouteParams } from '../../lib/routes';

export const ViewCardPage = () => {
  const { cardNick } = useParams() as ViewCardPageRouteParams;
  return (
    <div>
      <h1>{cardNick} </h1>
      <p>Описание миниатюры</p>
      <div>
        <p>Текст 1</p>
        <p>Текст 2</p>
        <p>Текст 3</p>
      </div>
    </div>
  );
};
