import cn from 'classnames';

import css from './index.module.scss';

type Props = {
  children: React.ReactNode;

  className?: string;
};

export const FormItems = ({
  children,
  className,
}: Props) => {
  return (
    <div className={cn(css.formItems, className)}>
      {children}
    </div>
  );
};