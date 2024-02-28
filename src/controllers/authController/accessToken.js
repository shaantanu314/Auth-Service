const _omit = require("lodash/omit");

const APIError = require("../../utils/APIError");

const {
  hasRefreshTokenExpired,
  getRefreshToken,
  generateAccessToken,
} = require("./helpers");

const getAccessToken = async (req, res, next) => {
  try {
    const refreshTokenCookie = getRefreshToken(req),
      hasExpired = await hasRefreshTokenExpired(refreshTokenCookie);

    if (!refreshTokenCookie || hasExpired) {
      throw new APIError(401, "Unauthorized Access");
    }

    const { user, accessToken } = await generateAccessToken(refreshTokenCookie);

    res.status(200).send({
      data: {
        user: _omit(user, ["user_password", "created_at"]),
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
