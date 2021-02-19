const { CelebrateError } = require('celebrate');
const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.errors);
  }

  if (err instanceof CelebrateError) {
    return res.status(400).send(err.details.get('body'));
  }
  return res
    .status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports = errorHandler;
