const APIError = require("../utils/APIError");

const sqlErrorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  let err2 = null;

  switch (err.code) {
    case "ER_DUP_ENTRY":
      err2 = new APIError(
        409,
        "A user with email id or username already exists"
      );
      return next(err2);

    case "ER_NO_SUCH_TABLE":
      err2 = new APIError(404, "Invalid Request");
      return next(err2);

    case "ER_BAD_FIELD_ERROR":
      err2 = new APIError(400, "Bad field error");
      return next(err2);

    case "ER_ACCESS_DENIED_ERROR":
      err2 = new APIError(403, "Access denied error: ");
      return next(err2);

    default:
      return next(err);
  }
};

module.exports = sqlErrorHandler;
