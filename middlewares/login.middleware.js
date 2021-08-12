const { statusCode } = require('../constants');
const { headerConstants: { AUTHORIZATION } } = require('../constants');
const { ErrorHandler } = require('../errors');
const { loginValidator } = require('../validators');
const {
  errorMessage: {
    NO_TOKEN, WRONG_TOKEN, INVALID_KEY_VALUE
  }
} = require('../errors');
const { authService } = require('../services');
const db = require('../dataBase/db');
const { REFRESH } = require('../constants/tokensConstants');

module.exports = {
  checkLoginValidity: (req, res, next) => {
    try {
      const { error } = loginValidator.logIn.validate(req.body);

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

  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, NO_TOKEN.message, NO_TOKEN.code);
      }

      await authService.verifyToken(token);

      const accessUser = await db.select().from('auth').where('access_token', token);

      if (!accessUser[0]) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
      }

      req.user = accessUser[0].user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserID: (req, res, next) => {
    try {
      const { userId } = req.params;

      if (req.user.id.toString() !== userId) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, NO_TOKEN.message, NO_TOKEN.code);
      }

      await authService.verifyToken(token, REFRESH);
      const userByRefreshToken = await db.select().from('auth').where('refresh_token', token);

      if (!userByRefreshToken[0]) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
      }

      req.user = userByRefreshToken[0].user;

      next();
    } catch (e) {
      next(e);
    }
  }

};
