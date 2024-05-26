const sql = require("mysql2");
const { db } = require("./db");
const bcrypt = require("bcrypt");

const config = require("../config");

const { users: usersSchema } = require("./schemas/userSchema");

const connectionParams = {
  host: "localhost",
  user: "dfs",
  database: "dfsdata",
};

const pool = sql.createPool({
  password: "password",
  ...connectionParams,
});

function execSql(statement, values) {
  return new Promise(function (res, rej) {
    pool.getConnection((err, con) => {
      if (err) rej(err);
      con.query(statement, values, function (err, result) {
        con.release();
        if (err) rej(err);
        else res(result);
      });
    });
  });
}

const query = `
SELECT * FROM DfsUser;
`;

execSql(query).then(async (users) => {
  for (const user of users) {
    const {
      user_email,
      user_password,
      first_name,
      last_name,
      institution,
      designation,
      user_profile_url,
      user_role,
      user_tag_line,
      user_pronouns,
      user_organization_mailid,
      user_profile_image,
      user_signup_verification_status,
      user_organization_mail_verification_status,
      user_privileged_access,
    } = user;

    const encrypted_password = await bcrypt.hash(
      user_password,
      config.salt_rounds
    );

    db.insert(usersSchema)
      .values({
        user_email,
        user_password: encrypted_password,
        first_name,
        last_name,
        username: user_email,
        institution,
        designation,
        user_profile_url,
        user_details_json: {
          user_role,
          user_tag_line,
          user_pronouns,
          user_organization_mailid,
          user_profile_image,
          user_signup_verification_status,
          user_organization_mail_verification_status,
          user_privileged_access,
        },
      })
      .then((res) => {
        console.log("User inserted:", user_email);
      });
  }
});
