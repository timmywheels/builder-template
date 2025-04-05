import { defineConfig } from "kysely-ctl";
import { db } from "./src/plugins/db";

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "./src/config/database/migrations",
  },
  seeds: {
    seedFolder: "./src/config/database/seeds",
  },
});
