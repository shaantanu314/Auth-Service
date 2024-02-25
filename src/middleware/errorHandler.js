const APIError = require("../utils/APIError");

const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof APIError) {
    // Send APIError response with status code and message
    return res.status(err.statusCode).json({ error: err.message });
  } else {
    // Unknown error, send 500 Internal Server Error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = errorHandler;
