import { hash } from 'bcryptjs';

import { env } from '../config/env.js';
import { closeDatabase, query } from './client.js';

const seed = async (): Promise<void> => {
  const passwordHash = await hash(env.initialUserPassword, 12);

  await query(
    `
      INSERT INTO users (email, display_name, password_hash)
      VALUES ($1, $2, $3)
      ON CONFLICT (email)
      DO UPDATE SET
        display_name = EXCLUDED.display_name,
        password_hash = EXCLUDED.password_hash,
        updated_at = now()
    `,
    [env.initialUserEmail.toLowerCase(), env.initialUserDisplayName, passwordHash]
  );

  console.log(`Initial user is ready: ${env.initialUserEmail.toLowerCase()}`);
};

seed()
  .catch((error: unknown) => {
    console.error('Database seed failed.', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void closeDatabase();
  });
