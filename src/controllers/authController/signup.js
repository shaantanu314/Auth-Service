const bcrypt = require("bcrypt");
const { eq } = require("drizzle-orm");
const _omit = require("lodash/omit");

const { users } = require("../../db/schemas/userSchema");
const db = require("../../db");

const config = require("../../config");

const signup = async (req, res, next) => {
  try {
    const {
      user_email,
      user_password,
      first_name,
      last_name,
      username,
      institution,
      designation,
      user_profile_url,
    } = req.body;

    const encrypted_password = await bcrypt.hash(
      user_password,
      config.salt_rounds
    );

    const newUser = await db
      .insert(users)
      .values({
        user_email,
        user_password: encrypted_password,
        first_name,
        last_name,
        username,
        institution,
        designation,
        user_profile_url,
      })
      .then(async (res) => {
        const user_id = res[0].insertId;

        return (
          await db.select().from(users).where(eq(users.user_id, user_id))
        )[0];
      });

    // Todo: This is successful. send email verification link

    res.status(200).send({
      data: {
        user: _omit(newUser, ["user_password", "created_at"]),
      },
      message: "user registered successfully",
      error: false,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = signup;
