import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

const FALLBACK_DATABASE_URL = 'postgresql://devstash:devstash@localhost:5432/devstash'

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    // Allow starter deployments/builds before real DB is configured.
    // Runtime database operations will still require a real DATABASE_URL.
    url: process.env.DATABASE_URL || FALLBACK_DATABASE_URL,
  },
})
