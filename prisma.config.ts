import "dotenv/config"
import {defineConfig, env} from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    "seed": "ts-node prisma/seed.ts",
    path:"prisma/migrations"
  },
  datasource: {
    url: env("DATABASE_URL"), // Make sure DATABASE_URL is set in your .env
  },
});
