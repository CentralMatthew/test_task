const router = require('express').Router();
const {
  getAllUsers, createUser, getUserById, updateUser
} = require('../controllers/user.controller');

const {
  userMiddleware:
      {
        checkUserValidity,
        isEmailBusy,
        checkUserUpdateValidity,
        getUserByDynamicParam
      },
  loginMiddleware: {
    checkUserID,
    checkAccessToken,
  }
} = require('../middlewares');

router.use('/:userId', getUserByDynamicParam('userId', 'params', 'id'));

router.get('/', getAllUsers);

router.get('/:userId', getUserById);

router.put('/:userId',
  checkAccessToken,
  checkUserID,
  checkUserUpdateValidity,
  updateUser);

router.post('/',
  checkUserValidity,
  isEmailBusy,
  createUser);

module.exports = router;
