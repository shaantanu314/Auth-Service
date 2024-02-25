const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require("mysql2/promise");

const { users } = require("./schemas/userSchema");

require("dotenv").config();

const poolConnection = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

const db = drizzle(poolConnection);

module.exports = { db };
