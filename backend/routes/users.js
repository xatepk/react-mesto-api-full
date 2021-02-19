const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar, getUserInfo, login,
} = require('../controllers/users');
const authValidator = require('../middlewares/validators/auth');
const authRouter = require('../middlewares/auth');

router.post('/signin', authValidator, login);
router.post('/signup', authValidator, createUser);
router.get('/users', authRouter, getUsers);
router.get('/users/:id', authRouter, getUserById);
router.get('/users/me', authRouter, getUserInfo);
router.patch('/users/me', authRouter, updateProfile);
router.patch('/users/me/avatar', authRouter, updateAvatar);

module.exports = router;
