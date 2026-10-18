import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';
import styles from './AuthPages.module.css';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      toast.success('Вы успешно вошли');
      navigate('/profile', { replace: true });
    } catch (loginError) {
      const message =
        loginError instanceof Error ? loginError.message : 'Не удалось войти';
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1>Вход</h1>
        <p className={styles.subtitle}>
          Войдите, чтобы получить доступ к профилю
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Пароль</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className={styles.hint}>
          Нет аккаунта?{' '}
          <a className={styles.link} href="/public">
            Публичная страница
          </a>
        </p>
      </div>
    </section>
  );
}
