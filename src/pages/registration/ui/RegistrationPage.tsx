import { RegistrationForm } from 'features/registrationForm';
import { SubscribeWizard } from 'features/subscribeWizard';
import styles from './RegistrationPage.module.css';

export function RegistrationPage() {
  return (
    <div className={styles.page}>
      <h1>Регистрация</h1>
      
      <RegistrationForm />

      <h2>Подписка на обновления</h2>
      <SubscribeWizard />
    </div>
  );
}
