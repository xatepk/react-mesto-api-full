const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_TTL } = require('../config/index');
const User = require('../models/user');
const { NotFound, Conflict, Unautorized } = require('../errors/index');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFound('Нет пользователей в базе');
    })
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      throw new NotFound('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.getUserInfo = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFound('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет пользователя с таким id');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет пользователя с таким id');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unautorized('Неправильные логин или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            return user;
          }
          throw new Unautorized('Неправильные логин или пароль');
        });
    })
    .then(({ _id }) => {
      const token = jwt.sign(
        { _id },
        JWT_SECRET,
        { expiresIn: JWT_TTL },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Данный email уже используется');
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ email, password: hash }))
    .then((user) => res.send(user))
    .catch(next);
};
