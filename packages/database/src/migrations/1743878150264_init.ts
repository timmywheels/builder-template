import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  // up migration code goes here...
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await db.schema
    .createTable("user")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("email", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("name", "varchar(255)")
    .addColumn("password", "varchar(255)")
    .addColumn("avatar", "text")
    .addColumn("is_account_confirmed", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("is_onboarded", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("account_confirmation_token", "text", (col) => col.unique())
    .addColumn("password_reset_token", "text", (col) => col.unique())
    .addColumn("created_at", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable("role")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "varchar(255)", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable("user_role")
    .addColumn("user_id", "uuid", (col) => col.references("user.id"))
    .addColumn("role_id", "uuid", (col) => col.references("role.id"))
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  // down migration code goes here...
  // note: down migrations are optional. you can safely delete this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await db.schema.dropTable("user_role").execute();
  await db.schema.dropTable("role").execute();
  await db.schema.dropTable("user").execute();
}
