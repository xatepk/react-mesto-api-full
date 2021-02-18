const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(w{1,3}\.)?\S+(#$)?/gm.test(v);
      },
      message: 'указан неверный адрес',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
