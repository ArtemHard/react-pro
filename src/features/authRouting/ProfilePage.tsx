import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';
import styles from './AuthPages.module.css';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.info('Вы вышли из аккаунта');
    } finally {
      setIsLoggingOut(false);
      navigate('/login', { replace: true });
    }
  };

  if (!user) {
    return <p>Загрузка профиля...</p>;
  }
console.log('user ', user);

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1>Профиль</h1>

        <div className={styles.profile}>
          {user.avatarPath && (
            <img
              className={styles.avatar}
              src={user.avatarPath}
              alt={user.name}
            />
          )}

          <div>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.meta}>{user.email}</p>
            {user.roles && user.roles.length > 0 && (
              <p className={styles.meta}>Роли: {user.roles.join(', ')}</p>
            )}
            {user.about && <p className={styles.about}>{user.about}</p>}
          </div>
        </div>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Выход...' : 'Выйти'}
        </button>
      </div>
    </section>
  );
}
