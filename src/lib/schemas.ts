import { z } from 'zod';

export const MessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'message cannot be empty.')
    .max(2000, 'message is too long.'),
});

export type Message = z.infer<typeof MessageSchema>;
