import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1)
});

export const registerSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(12).max(128),
  displayName: z.string().trim().min(1).max(120)
});
