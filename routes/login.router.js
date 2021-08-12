const router = require('express').Router();

const { loginController } = require('../controllers');
const {
  userMiddleware: { getUserByDynamicParam },
  loginMiddleware: { checkLoginValidity, checkRefreshToken, checkAccessToken }
} = require('../middlewares');

router.post('/login',
  checkLoginValidity,
  getUserByDynamicParam('email'),
  loginController.login);

router.post('/logout',
  checkAccessToken,
  loginController.logout);

router.post('/refresh', checkRefreshToken, loginController.refresh);

module.exports = router;
