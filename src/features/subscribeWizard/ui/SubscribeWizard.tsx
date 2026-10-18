import { useActionState } from 'react';
import { toast } from 'react-toastify';
import { subscribeSchema } from 'features/subscribeWizard/model/schema';
import styles from './SubscribeWizard.module.css';

interface WizardState {
  step: 1 | 2;
  email: string;
  error: string | null;
  success: boolean;
}

const initialState: WizardState = {
  step: 1,
  email: '',
  error: null,
  success: false,
};

async function wizardAction(prev: WizardState, formData: FormData): Promise<WizardState> {
  const intent = String(formData.get('intent') ?? '');

  if (intent === 'back') {
    return { ...initialState, email: prev.email };
  }

  if (intent === 'confirm') {
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success(`Подписка для ${prev.email} успешно оформлена!`, { toastId: 'subscribe-success' });
    return { step: 2, email: prev.email, error: null, success: true };
  }

  const email = String(formData.get('email') ?? '').trim();
  const result = subscribeSchema.safeParse({ email });
  if (!result.success) {
    const error = result.error.issues[0]?.message ?? 'Некорректный email';
    return { step: 1, email, error, success: false };
  }

  await new Promise((resolve) => setTimeout(resolve, 700));
  return { step: 2, email: result.data.email, error: null, success: false };
}

export function SubscribeWizard() {
  const [state, formAction, isPending] = useActionState(wizardAction, initialState);

  if (state.success) {
    return (
      <div className={styles.wizard}>
        <p className={styles.success}>Подписка для {state.email} успешно оформлена!</p>
        <form action={formAction} noValidate>
          <input type="hidden" name="intent" value="back" />
          <button type="submit" className={styles.secondary}>
            Оформить ещё одну
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.wizard}>
      <p className={styles.step}>Шаг {state.step} из 2</p>

      {state.step === 1 ? (
        <form action={formAction} className={styles.form} noValidate>
          <input type="hidden" name="intent" value="email" />
          <label htmlFor="subscribe-email">Email для подписки</label>
          <input
            id="subscribe-email"
            name="email"
            type="email"
            defaultValue={state.email}
            placeholder="user@example.com"
          />
          {state.error && <span className={styles.error}>{state.error}</span>}
          <button type="submit" className={styles.primary} disabled={isPending}>
            {isPending ? 'Проверка...' : 'Далее'}
          </button>
        </form>
      ) : (
        <form action={formAction} className={styles.form} noValidate>
          <p className={styles.confirmText}>
            Подтвердите подписку для <strong>{state.email}</strong>
          </p>
          <div className={styles.actions}>
            <button
              type="submit"
              name="intent"
              value="confirm"
              className={styles.primary}
              disabled={isPending}
            >
              {isPending ? 'Отправка...' : 'Подтвердить'}
            </button>
            <button
              type="submit"
              name="intent"
              value="back"
              className={styles.secondary}
              disabled={isPending}
            >
              Назад
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
