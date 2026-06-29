import { defineConfig, env } from 'prisma/config'

// Prisma 7 evaluates this file before loading .env, so we load it explicitly.
process.loadEnvFile()

export default defineConfig({
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    seed: 'tsx ./prisma/seed.ts',
  },
})
