import { z } from 'zod';

export const socialLinkSchema = z.object({
  url: z.string().url('Некорректный URL'),
});

export const registrationSchema = z
  .object({
    username: z.string().min(1, 'Имя пользователя обязательно'),
    email: z
      .string()
      .min(1, 'Email обязателен')
      .includes('@', { message: 'Email должен содержать @' })
      .email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
    socialLinks: z.array(socialLinkSchema),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
