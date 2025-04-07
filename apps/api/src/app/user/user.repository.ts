import { DB } from "@app/database";
import { FastifyInstance } from "fastify";
import { InsertObject, UpdateObject } from "kysely";

export class UserRepository {
  constructor(private fastify: FastifyInstance) {}

  async getUserById(id: string) {
    return this.fastify.db
      .selectFrom("user")
      .select(["id", "email", "name", "avatar", "isAccountConfirmed", "isOnboarded"])
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async getUserByEmail(email: string) {
    return this.fastify.db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", email.toLowerCase())
      .executeTakeFirst();
  }

  async getUserByEmailAndPasswordResetToken(params: { email: string; passwordResetToken: string }) {
    return this.fastify.db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", params.email)
      .where("passwordResetToken", "=", params.passwordResetToken)
      .executeTakeFirst();
  }

  async getUserByEmailAndAccountConfirmationToken(params: {
    email: string;
    accountConfirmationToken: string;
  }) {
    return this.fastify.db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", params.email)
      .where("accountConfirmationToken", "=", params.accountConfirmationToken)
      .executeTakeFirst();
  }

  async createUser(user: InsertObject<DB, "user">) {
    return this.fastify.db.insertInto("user").values(user).returningAll().executeTakeFirst();
  }

  async updateUser(id: string, user: UpdateObject<DB, "user">) {
    return this.fastify.db
      .updateTable("user")
      .set(user)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }

  async deleteUser(id: string) {
    return this.fastify.db
      .deleteFrom("user")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }
}
