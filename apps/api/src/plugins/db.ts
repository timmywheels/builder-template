import { Kysely, PostgresDialect } from "kysely";
import { DB } from "@/types/db/db.schema.js";
import pg from "pg";
import { FastifyPluginCallback } from "fastify";
import { assert } from "console";
const { Pool } = pg;

assert(process.env.DATABASE_URL, "DATABASE_URL is not set");

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

const database: FastifyPluginCallback = (fastify, _opts) => {
  fastify.decorate("db", db);
};

export default database;

declare module "fastify" {
  interface FastifyInstance {
    db: Kysely<DB>;
  }
}
