import { z } from 'zod';

export const zSignInTrpcInput = z.object({
  nick: z.string().min(3, 'Минимальное количество символов 3'),
  password: z.string().min(8, 'Минимальное количество символов 8'),
});
