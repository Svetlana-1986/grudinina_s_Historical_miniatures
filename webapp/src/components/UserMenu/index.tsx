import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { SignOutButton } from '../SignOutButton';

import { getProfileRoutePage, getNewCardPageRoute } from '../../lib/routes';

import css from './index.module.scss';

type Props = {
  nick?: string;
};

export const UserMenu = ({ nick }: Props) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <button
        className={css.trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        {nick ?? 'Пользователь'} ▼
      </button>

      {open && (
        <div className={css.menu}>
          <Link className={css.item} to={getProfileRoutePage()}>
            Профиль
          </Link>

          <Link className={css.item} to={getNewCardPageRoute()}>
            Создать публикацию
          </Link>

          <div className={css.separator} />

          <SignOutButton className={css.signOut} />
        </div>
      )}
    </div>
  );
};
