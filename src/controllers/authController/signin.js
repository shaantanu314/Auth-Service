const bcrypt = require("bcrypt");
const { eq } = require("drizzle-orm");
const _omit = require("lodash/omit");

const APIError = require("../../utils/APIError");
const { signToken } = require("../../utils/jwt");

const { users } = require("../../db/schemas/userSchema");
const {
  refreshToken: refreshTokenSchema,
} = require("../../db/schemas/refreshTokenSchema");
const db = require("../../db");

const config = require("../../config");

const signin = async (req, res, next) => {
  try {
    const { user_email, user_password } = req.body;

    const user = (
      await db.select().from(users).where(eq(users.user_email, user_email))
    )[0];

    if (!user) {
      throw new APIError(400, "Invalid Credentials");
    }

    const shouldAuthenticate = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!shouldAuthenticate) {
      throw new APIError(400, "Invalid Credentials");
    }

    const accessToken = signToken({ user }); // Todo: add user roles here

    const refreshToken = "refresh token";
    const expires_at = new Date().getTime() + config.refresh_token_expiry_time; // Todo: fix this

    await db.insert(refreshTokenSchema).values({
      user_id: user.user_id,
      token: refreshToken,
      expires_at,
    });

    res.cookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      expire: expires_at,
    });

    res.status(200).send({
      data: {
        user: _omit(user, ["user_password", "created_at"]),
        accessToken,
      },
      message: "user logged-in successfully",
      error: false,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = signin;
