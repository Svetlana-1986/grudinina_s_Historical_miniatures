import cn from 'classnames';
import css from './index.module.scss';

type Props = {
  children: React.ReactNode;

  loading?: boolean;

  type?: 'button' | 'submit' | 'reset';

  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
};

export const Button = ({
  children,
  loading = false,
  type = 'button',
  onClick,
}: Props) => {
  return (
    <button
      className={cn(css.button, {
        [css.loading]: loading,
      })}
      type={type}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? 'Загрузка...' : children}
    </button>
  );
};
