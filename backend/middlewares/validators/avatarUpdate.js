const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const avatarUpdate = celebrate({
  body: {
    avatar: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка');
    }).message({
      'any.require': 'Обязательное поле',
    }),
  },
});

module.exports = avatarUpdate;
