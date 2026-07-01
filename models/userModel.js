const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a vaid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //only work on create and save
      validator: function () {
        return this.passwordConfirm === this.password; //true or false
      },
      message: 'Passwords doesnot match',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
