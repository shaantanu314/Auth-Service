const {
  mysqlTable,
  int,
  timestamp,
  varchar,
} = require("drizzle-orm/mysql-core");

const { users } = require("../userSchema");

const otpSchema = mysqlTable("OTP", {
  user_id: int("user_id")
    .notNull()
    .references(() => users.user_id)
    .primaryKey(),
  otp: varchar("otp", { length: 6 }).notNull(),
  expires_at: timestamp("expires_at").notNull(),
});

module.exports = {
  otpSchema,
};
