const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const auth = celebrate({
  body: {
    password: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.require': 'Обязательное поле',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    }).message({
      'any.require': 'Обязательное поле',
    }),
  },
});

module.exports = auth;
