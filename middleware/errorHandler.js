const logger = require("../utils/logger/logger");

const logError = (err) => {
  logger.error(err);
};

const logErrorMiddleware = (err, req, res, next) => {
  // log error to request, requests will be logged even if the server crashes,
  // but data from the response (like the response code, content length, etc.) cannot be logged.
  req.error = err;
  logError(err);
  next(err);
};

// eslint-disable-next-line no-unused-vars
const returnError = (err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message);
};

module.exports = {
  logErrorMiddleware,
  returnError,
};
