import { Pool, QueryResultRow } from 'pg';

import { env } from '../config/env.js';

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.databaseSsl
    ? {
        rejectUnauthorized: false
      }
    : false
});

export const query = <TRow extends QueryResultRow = QueryResultRow>(
  sql: string,
  values: unknown[] = []
) => pool.query<TRow>(sql, values);

export const closeDatabase = async (): Promise<void> => {
  await pool.end();
};
