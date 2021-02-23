const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createCard = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.require': 'Обязательное поле',
      }),
    link: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка');
    }).message({
      'any.require': 'Обязательное поле',
    }),
  },
});

module.exports = createCard;
