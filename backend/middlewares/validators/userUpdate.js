const { celebrate, Joi } = require('celebrate');

const userUpdate = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.require': 'Обязательное поле',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.require': 'Обязательное поле',
      }),
  },
});

module.exports = userUpdate;
