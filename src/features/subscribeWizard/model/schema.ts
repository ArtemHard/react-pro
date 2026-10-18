import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z.string().min(1, 'Укажите email').email('Некорректный email'),
});
