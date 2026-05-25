import cn from 'classnames';
import css from './index.module.scss';

export const Alert = ({
  type = 'success',
  children,
}: {
  type?: 'error' | 'success' | 'warning';
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(css.alert, {
        [css.error]: type === 'error',
        [css.success]: type === 'success',
        [css.warning]: type === 'warning',
      })}
    >
      {children}
    </div>
  );
};