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
  `,
  `
    ALTER TABLE ai_generations
    ADD COLUMN IF NOT EXISTS vector_store_id text
  `,
  `
    CREATE TABLE IF NOT EXISTS ai_vector_stores (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      openai_vector_store_id text NOT NULL UNIQUE,
      name text NOT NULL,
      status text NOT NULL,
      is_default boolean NOT NULL DEFAULT false,
      created_by uuid REFERENCES users(id) ON DELETE SET NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `,
  `
    CREATE UNIQUE INDEX IF NOT EXISTS ai_vector_stores_one_default_idx
    ON ai_vector_stores (is_default)
    WHERE is_default = true
  `,
  `
    CREATE TABLE IF NOT EXISTS ai_vector_store_files (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      openai_vector_store_id text NOT NULL,
      openai_file_id text NOT NULL,
      filename text NOT NULL,
      mime_type text,
      bytes bigint NOT NULL,
      status text NOT NULL,
      created_by uuid REFERENCES users(id) ON DELETE SET NULL,
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
