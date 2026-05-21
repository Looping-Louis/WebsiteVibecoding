import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().min(1).default('127.0.0.1'),
  CORS_ORIGIN: z.string().url().default('http://localhost:4200'),
  DEMO_EMAIL: z.string().email().default('demo@ai.local'),
  DEMO_PASSWORD: z.string().min(1).default('demo1234'),
  JWT_SECRET: z.string().min(1).default('change-me'),
  OPENAI_API_KEY: z.string().optional()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid backend environment configuration', parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

const values = parsedEnv.data;

export const env = {
  nodeEnv: values.NODE_ENV,
  port: values.PORT,
  host: values.HOST,
  corsOrigin: values.CORS_ORIGIN,
  demoEmail: values.DEMO_EMAIL,
  demoPassword: values.DEMO_PASSWORD,
  jwtSecret: values.JWT_SECRET,
  openAiApiKey: values.OPENAI_API_KEY || undefined
} as const;
