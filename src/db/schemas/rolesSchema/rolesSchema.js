const {
  mysqlTable,
  int,
  varchar,
  text,
  primaryKey,
} = require("drizzle-orm/mysql-core");

const { users } = require("../userSchema");

const roles = mysqlTable("Roles", {
  role_id: int("role_id").primaryKey(),
  role_name: varchar("role_name", { length: 255 }).notNull().unique(),
  role_description: text("role_description"),
});

const userPermissions = mysqlTable(
  "UserPermissions",
  {
    user_id: int("user_id"),
    role_id: int("role_id"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.user_id, table.role_id] }),
    };
  }
);

module.exports = {
  roles,
  userPermissions,
};
