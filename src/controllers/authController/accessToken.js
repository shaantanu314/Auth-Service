const _omit = require("lodash/omit");

const APIError = require("../../utils/APIError");

const {
  hasRefreshTokenExpired,
  getRefreshToken,
  generateAccessToken,
  getUserPermissions,
} = require("./helpers");

const getAccessToken = async (req, res, next) => {
  try {
    const refreshTokenCookie = getRefreshToken(req),
      hasExpired = await hasRefreshTokenExpired(refreshTokenCookie);

    if (!refreshTokenCookie || hasExpired) {
      throw new APIError(401, "Unauthorized Access");
    }

    const { user, accessToken } = await generateAccessToken(refreshTokenCookie);

    // get user permissions
    const user_permissions = await getUserPermissions(user.user_id);

    res.status(200).send({
      data: {
        user: _omit(user, ["user_password", "created_at"]),
        user_permissions,
        accessToken,
      },
      message: "new access token generated",
      error: false,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getAccessToken;
