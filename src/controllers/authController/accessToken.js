const { eq, and } = require("drizzle-orm");
const _omit = require("lodash/omit");

const APIError = require("../../utils/APIError");

const {
  refreshToken: refreshTokenSchema,
} = require("../../db/schemas/refreshTokenSchema");
const { users } = require("../../db/schemas/userSchema");
const db = require("../../db");

const { hasRefreshTokenExpired, getRefreshToken } = require("./helpers");
const { signToken } = require("../../utils/jwt");

const config = require("../../config");

const getAccessToken = async (req, res) => {
  const refreshTokenCookie = getRefreshToken(req),
    hasExpired = await hasRefreshTokenExpired(refreshTokenCookie);

  if (!refreshTokenCookie || hasExpired) {
    throw new APIError(401, "Token Expired");
  }

  const user = (
    await db
      .select({ ...users })
      .from(users)
      .innerJoin(
        refreshTokenSchema,
        and(
          eq(users.user_id, refreshTokenSchema.user_id),
          eq(refreshTokenSchema.token, refreshTokenCookie)
        )
      )
  )?.[0];

  // Create an access token
  const accessToken = signToken({
    user,
    expires_at: new Date().getTime() + config.access_token_expiry_time,
  }); // Todo: add user roles here

  res.status(200).send({
    data: {
      user: _omit(user, ["user_password", "created_at"]),
      accessToken,
    },
    message: "new access token generated",
    error: false,
  });
};

module.exports = getAccessToken;
