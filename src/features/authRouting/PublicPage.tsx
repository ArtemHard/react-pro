import { Link } from 'react-router-dom';
import { useAuth } from './useAuth';
import styles from './AuthPages.module.css';

export function PublicPage() {
  const { isAuthenticated } = useAuth();

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1>Публичная страница</h1>
        <p className={styles.subtitle}>
          Эта страница доступна всем пользователям без авторизации.
        </p>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <Link className={styles.primaryButton} to="/profile">
              Перейти в профиль
            </Link>
          ) : (
            <Link className={styles.primaryButton} to="/login">
              Войти
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
