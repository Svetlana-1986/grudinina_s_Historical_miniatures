import { z } from 'zod';

export const zSignUpTrpcInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      'Nick автора может содержать только строчные латинские буквы, цифры и дефис',
    ),
  password: z.string().min(1),
});
