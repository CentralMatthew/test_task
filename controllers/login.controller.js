const { passwordHasher, authService } = require('../services');
const db = require('../dataBase/db');
const { AUTHORIZATION } = require('../constants/headers');
const { statusCode, successResult } = require('../constants');

module.exports = {
  login: async (req, res, next) => {
    try {
      const {
        password: hashedPassword, email
      } = req.user;

      const { password } = req.body;
      await passwordHasher.compare(hashedPassword, password);

      const tokenPair = await authService.generateTokenPair();

      const user = await db.select().from('users').where({ email });

      await db('auth').insert({ access_token: tokenPair.access_token, refresh_token: tokenPair.refresh_token, user: user[0] });

      res.json({
        ...tokenPair,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await db('auth').where('access_token', token).del();

      res.status(statusCode.NO_CONTENT).json(successResult.SUCCESS_LOG_OUT);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const refreshToken = req.get(AUTHORIZATION);

      const tokenPair = authService.generateTokenPair();

      await db('auth').where({ refresh_token: refreshToken }).update(
        { access_token: tokenPair.access_token, refresh_token: tokenPair.refresh_token }
      );

      res.json({
        ...tokenPair,
        user: req.user
      });

      res.status(statusCode.OK).json(successResult.SUCCESS_REFRESH);
    } catch (e) {
      next(e);
    }
  }
};
