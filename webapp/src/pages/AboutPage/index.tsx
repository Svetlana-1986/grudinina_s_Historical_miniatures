import { Link } from 'react-router-dom';

import { FaLandmark, FaUsers, FaBookOpen, FaMedal } from 'react-icons/fa';

import css from './index.module.scss';

export const AboutPage = () => {
  return (
    <div className={css.page}>
      <section className={css.hero}>
        <h1 className={css.title}>О ПРОЕКТЕ</h1>

        <p className={css.subtitle}>
          История в миниатюре — это цифровое пространство для коллекционеров,
          моделистов и авторов военно-исторической миниатюры.
        </p>
      </section>

      <section className={css.section}>
        <h2>Наша миссия:</h2>

        <p>
          Сохранение исторической памяти через творчество. Каждая миниатюра —
          это маленькая история, воплощённая в масштабе.
        </p>
      </section>

      <section className={css.features}>
        <article className={css.card}>
          <FaLandmark className={css.icon} />

          <h3>Историческая достоверность</h3>

          <p>Изучение эпох, армий, униформы и исторических событий.</p>
        </article>

        <article className={css.card}>
          <FaUsers className={css.icon} />

          <h3>Сообщество авторов</h3>

          <p>Публикация работ и обмен опытом между моделистами.</p>
        </article>

        <article className={css.card}>
          <FaBookOpen className={css.icon} />

          <h3>База знаний</h3>

          <p>Статьи, обзоры и материалы по военно-исторической тематике.</p>
        </article>

        <article className={css.card}>
          <FaMedal className={css.icon} />

          <h3>Развитие мастерства</h3>

          <p>Возможность вдохновляться лучшими работами сообщества.</p>
        </article>
      </section>

      <section className={css.section}>
        <h2>Что уже доступно:</h2>

        <ul className={css.list}>
          <li>Публикация военно-исторических миниатюр</li>
          <li>Галерея работ</li>
          <li>Авторские страницы</li>
          <li>Блог проекта</li>
        </ul>
      </section>

      <section className={css.section}>
        <h2>Планы развития:</h2>

        <ul className={css.list}>
          <li>Комментарии и обсуждения</li>
          <li>Избранные публикации</li>
          <li>Рейтинги авторов</li>
          <li>Каталог исторических эпох</li>
          <li> и тематические подборки</li>
        </ul>
      </section>

      <section className={css.cta}>
        <h2>Начните знакомство с проектом</h2>

        <Link to="/allcards" className={css.button}>
          В ГАЛЕРЕЮ
        </Link>
      </section>
    </div>
  );
};
