import { defineConfig } from "kysely-ctl";
import { CamelCasePlugin, PostgresDialect } from "kysely";
import { Pool } from "pg";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export default defineConfig({
  dialect,
  plugins: [new CamelCasePlugin()],
  migrations: {
    migrationFolder: "./src/migrations",
  },
  seeds: {
    seedFolder: "./src/seeds",
  },
});
