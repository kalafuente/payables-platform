import { existsSync } from 'node:fs'
import { defineConfig, env } from 'prisma/config'

if (existsSync('.env')) {
  process.loadEnvFile()
}

export default defineConfig({
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    seed: 'tsx ./prisma/seed.ts',
  },
})