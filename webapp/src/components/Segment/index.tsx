import css from './index.module.scss';

export const Segment = ({
  title,
  size = 1,
  children,
}: {
  title?: React.ReactNode;
  size?: 1 | 2;
  children?: React.ReactNode;
}) => {
  return (
    <div className={css.segment}>
      {title &&
        (size === 1 ? (
          <h1 className={css.title}>{title}</h1>
        ) : (
          <h2 className={css.title}>{title}</h2>
        ))}

      <div className={css.content}>{children}</div>
    </div>
  );
};
