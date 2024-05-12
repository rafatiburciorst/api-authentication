import { Config } from 'drizzle-kit';
import { env } from './src/env'

export default {
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    url: env.DRIZZLE_DATABASE_URL
  }
} satisfies Config
