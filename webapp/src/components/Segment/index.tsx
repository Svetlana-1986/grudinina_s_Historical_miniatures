import css from './index.module.scss';

export const Segment = ({
  title,
  size = 1,
  centerTitle = false,
  children,
}: {
  title?: React.ReactNode;
  size?: 1 | 2;
  centerTitle?: boolean;
  children?: React.ReactNode;
}) => {
  const titleClass = centerTitle ? `${css.title} ${css.centered}` : css.title;

  return (
    <div className={css.segment}>
      {title &&
        (size === 1 ? (
          <h1 className={titleClass}>{title}</h1>
        ) : (
          <h2 className={titleClass}>{title}</h2>
        ))}

      <div className={css.content}>{children}</div>
    </div>
  );
};
