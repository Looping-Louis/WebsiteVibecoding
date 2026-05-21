import { closeDatabase, query } from './client.js';

const statements = [
  'CREATE EXTENSION IF NOT EXISTS pgcrypto',
  `
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL UNIQUE,
      display_name text NOT NULL,
      password_hash text NOT NULL,
      role text NOT NULL DEFAULT 'user',
      is_active boolean NOT NULL DEFAULT true,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `,
  'CREATE INDEX IF NOT EXISTS users_email_lower_idx ON users (lower(email))',
  `
    CREATE TABLE IF NOT EXISTS contact_requests (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      reference_id text NOT NULL UNIQUE,
      name text NOT NULL,
      email text NOT NULL,
      topic text NOT NULL,
      message text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS ai_generations (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES users(id) ON DELETE SET NULL,
      prompt text NOT NULL,
      response_content text NOT NULL,
      provider text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `
];

const migrate = async (): Promise<void> => {
  for (const statement of statements) {
    await query(statement);
  }

  console.log('Database migrations completed.');
};

migrate()
  .catch((error: unknown) => {
    console.error('Database migration failed.', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void closeDatabase();
  });
