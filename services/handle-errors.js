const { unknownErrors, statusCode } = require('../constants');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  handleErrors: (err, req, res, next) => {
    res
      .status(err.status)
      .json({
        message: err.message || unknownErrors.UNKNOWN_ERROR,
        customCode: err.code || unknownErrors.UNKNOWN_STATUS
      });
  },

  notFoundHandler: (err, req, res, next) => {
    next({
      status: err.status || statusCode.NOT_FOUND,
      message: err.message || unknownErrors.ROUTE_NOT_FOUND
    });
  }
};
