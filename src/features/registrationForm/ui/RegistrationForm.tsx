import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  registrationSchema,
  type RegistrationFormValues,
} from 'features/registrationForm/model/schema';
import styles from './RegistrationForm.module.css';

const defaultValues: RegistrationFormValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  socialLinks: [{ url: '' }],
};

export function RegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const onSubmit = (data: RegistrationFormValues) => {
    toast.success('Регистрация прошла успешно!');
    reset(defaultValues);
    console.log('Регистрация:', data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label htmlFor="username">Имя пользователя</label>
        <input
          id="username"
          type="text"
          {...register('username', { onChange: () => clearErrors('username') })}
        />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { onChange: () => clearErrors('email') })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          {...register('password', { onChange: () => clearErrors('password') })}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="confirmPassword">Подтверждение пароля</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', { onChange: () => clearErrors('confirmPassword') })}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <fieldset className={styles.fieldset}>
        <legend>Социальные ссылки</legend>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.linkRow}>
            <div className={styles.field}>
              <input
                type="url"
                placeholder="https://github.com/username"
                {...register(`socialLinks.${index}.url`, {
                  onChange: () => clearErrors(`socialLinks.${index}.url`),
                })}
              />
              {errors.socialLinks?.[index]?.url && (
                <span className={styles.error}>{errors.socialLinks[index]?.url?.message}</span>
              )}
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              Удалить
            </button>
          </div>
        ))}
        <button type="button" className={styles.addButton} onClick={() => append({ url: '' })}>
          Добавить ссылку
        </button>
      </fieldset>

      <button type="submit" className={styles.submitButton}>
        Зарегистрироваться
      </button>

      <button type="button" className={styles.resetButton} onClick={() => reset(defaultValues)}>
        Сбросить
      </button>
    </form>
  );
}
