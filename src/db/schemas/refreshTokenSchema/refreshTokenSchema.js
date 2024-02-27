const {
  mysqlTable,
  int,
  varchar,
  timestamp,
} = require("drizzle-orm/mysql-core");
const { sql, relations } = require("drizzle-orm");

const { users } = require("../userSchema");

const refreshToken = mysqlTable("RefreshToken", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id")
    .notNull()
    .references(() => users.user_id),
  token: varchar("token", { length: 255 }).notNull(),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

module.exports = {
  refreshToken,
};
