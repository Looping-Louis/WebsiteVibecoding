import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().min(1).default('127.0.0.1'),
  CORS_ORIGIN: z.string().url().default('http://localhost:4200'),
  DATABASE_URL: z.string().min(1),
  DATABASE_SSL: z.coerce.boolean().optional(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN_HOURS: z.coerce.number().int().positive().default(8),
  INITIAL_USER_EMAIL: z.string().email().default('demo@ai.local'),
  INITIAL_USER_PASSWORD: z.string().min(12),
  INITIAL_USER_DISPLAY_NAME: z.string().min(1).default('Demo User'),
  ALLOW_REGISTRATION: z.coerce.boolean().default(false),
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
  databaseUrl: values.DATABASE_URL,
  databaseSsl: values.DATABASE_SSL ?? values.NODE_ENV === 'production',
  jwtSecret: values.JWT_SECRET,
  jwtExpiresInHours: values.JWT_EXPIRES_IN_HOURS,
  initialUserEmail: values.INITIAL_USER_EMAIL,
  initialUserPassword: values.INITIAL_USER_PASSWORD,
  initialUserDisplayName: values.INITIAL_USER_DISPLAY_NAME,
  allowRegistration: values.ALLOW_REGISTRATION,
  openAiApiKey: values.OPENAI_API_KEY || undefined
} as const;
