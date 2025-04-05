import { DB } from "@/types/db/db.schema.js";
import { FastifyInstance } from "fastify";
import { InsertObject, UpdateObject } from "kysely";

export class UserRepository {
  constructor(private fastify: FastifyInstance) {}

  async getUser(id: string) {
    return this.fastify.db.selectFrom("user").where("id", "=", id).executeTakeFirst();
  }

  async getUserByEmail(email: string) {
    return this.fastify.db.selectFrom("user").where("email", "=", email).executeTakeFirst();
  }

  async createUser(user: InsertObject<DB, "user">) {
    return this.fastify.db.insertInto("user").values(user).execute();
  }

  async updateUser(id: string, user: UpdateObject<DB, "user">) {
    return this.fastify.db.updateTable("user").set(user).where("id", "=", id).execute();
  }

  async deleteUser(id: string) {
    return this.fastify.db.deleteFrom("user").where("id", "=", id).execute();
  }
}
