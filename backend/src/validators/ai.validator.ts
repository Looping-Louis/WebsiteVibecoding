import { z } from 'zod';

export const aiGenerateSchema = z.object({
  prompt: z.string().trim().min(1).max(8000)
});
