const {
  mysqlTable,
  int,
  text,
  varchar,
  boolean,
  timestamp,
  json,
} = require("drizzle-orm/mysql-core");

const { sql } = require("drizzle-orm");

const users = mysqlTable("Users", {
  user_id: int("user_id").autoincrement().primaryKey(),
  user_email: varchar("user_email", { length: 63 }).notNull().unique(),
  first_name: text("first_name", { length: 63 }).notNull(),
  last_name: text("last_name", { length: 63 }).notNull(),
  username: varchar("username", { length: 63 }).notNull().unique(),
  user_password: varchar("user_password", { length: 255 }).notNull(),
  // fields below this have default values
  institution: varchar("institution", { length: 63 }).default(""),
  designation: varchar("designation", { length: 63 }).default("user"),
  user_profile_url: varchar("user_profile_url", { length: 255 }).default(""),
  user_details_json: json("user_details_json"),
  verified: boolean("verified").default(false), // to be modified only by auth server after email verification
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

module.exports = {
  users,
};
