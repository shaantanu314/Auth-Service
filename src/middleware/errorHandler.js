const APIError = require("../utils/APIError");

const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof APIError) {
    // Send APIError response with status code and message
    return res
      .status(err.statusCode)
      .json({ message: err.message, error: true });
  } else {
    // Unknown error, send 500 Internal Server Error response
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

module.exports = errorHandler;
