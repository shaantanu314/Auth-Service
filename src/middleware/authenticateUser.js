const jwt = require("jsonwebtoken");

// const APIError = require("../utils/APIError");

const { verifyToken } = require("../utils/jwt");
// const { getAccessToken } = require("../controllers/authController");

const hasAccessTokenExpired = (expires_at) => expires_at < new Date();

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    // If access token is invalid returen 401
    try {
      const isValidAccessToken = verifyToken(accessToken);
      if (!isValidAccessToken) {
        throw new Error("Unauthorized Access");
      }
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", error: true });
    }

    const decodedToken = jwt.decode(accessToken);

    const { user, expires_at } = decodedToken;

    // If access token is expired, generate a new token and set in header
    if (hasAccessTokenExpired(expires_at)) {
      res.setHeader("X-Access-Token-Expired", "true");

      return res
        .status(401)
        .json({ message: "Unauthorized Access", error: true });
      /*
    // This code is used to automatically get a new access token. 
    const refreshTokenCookie = getRefreshToken(req),
      hasExpired = await hasRefreshTokenExpired(refreshTokenCookie);

    if (!refreshTokenCookie || hasExpired) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    const newAccessToken = await getAccessToken(refreshToken);

    res.setHeader("Access-Token", newAccessToken);
    */
    }

    req.authentication = { user };

    return next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authenticateUser;
