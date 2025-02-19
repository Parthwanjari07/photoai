import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts', // Path to your schema file
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;