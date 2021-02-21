const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar, getUserInfo, login,
} = require('../controllers/users');
const authValidator = require('../middlewares/validators/auth');
const userUpdateValidator = require('../middlewares/validators/userUpdate');
const avatarUpdate = require('../middlewares/validators/avatarUpdate');
const authRouter = require('../middlewares/auth');

router.get('/users/me', authRouter, getUserInfo);
router.post('/signin', authValidator, login);
router.post('/signup', authValidator, createUser);
router.get('/users', authRouter, getUsers);
router.get('/users/:id', authRouter, getUserById);
router.patch('/users/me', userUpdateValidator, authRouter, updateProfile);
router.patch('/users/me/avatar', avatarUpdate, authRouter, updateAvatar);

module.exports = router;
