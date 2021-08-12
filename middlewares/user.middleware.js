const ErrorHandler = require('../errors/ErrorHandler');
const statusCode = require('../constants/statusCodes');
const { INVALID_KEY_VALUE, EMAIL_IS_NOT_AVAILABLE, USER_NOT_FOUND } = require('../errors/error-message');
const { userValidator } = require('../validators');
const db = require('../dataBase/db');

module.exports = {
  isEmailBusy: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await db.select().from('users').where('email', email);

      if (user.length) {
        throw new ErrorHandler(
          statusCode.CONFLICT,
          EMAIL_IS_NOT_AVAILABLE.message,
          EMAIL_IS_NOT_AVAILABLE.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checkUserValidity: (req, res, next) => {
    try {
      const { error } = userValidator.createUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          statusCode.BAD_REQUEST,
          error.details[0].message,
          INVALID_KEY_VALUE.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserUpdateValidity: (req, res, next) => {
    try {
      const { error } = userValidator.updateUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          statusCode.BAD_REQUEST,
          error.details[0].message,
          INVALID_KEY_VALUE.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam: (paramName, searchIn = 'body', dbKey = paramName) => async (req, res, next) => {
    try {
      const valueOfParams = req[searchIn][paramName];

      const user = await db.select().from('users').where({ [dbKey]: valueOfParams });

      if (!user[0]) {
        throw new ErrorHandler(
          statusCode.NOT_FOUND,
          USER_NOT_FOUND.message,
          USER_NOT_FOUND.code
        );
      }

      req.user = user[0];

      next();
    } catch (e) {
      next(e);
    }
  }
};
