const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

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
    select: false,
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

userSchema.pre('save', async function (next) {
  //if password not  Modified simply return
  if (!this.isModified('password')) return;
  //encrypt password to string with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  canditatePassword,
  userPassword,
) {
  // eslint-disable-next-line no-return-await
  return await bcrypt.compare(canditatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
