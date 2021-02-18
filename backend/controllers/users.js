const User = require('../models/user');
const { NotFound } = require('../errors/index');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res, next) => User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      throw new NotFound('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(404).send({ message: `Введены некорректные данные ${err}` });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      if (err.name === 'ValidationError') {
        return res.status(404).send({ message: `Введены некорректные данные ${err}` });
      }
      return res.status(500).send({ message: err.message });
    });
};
