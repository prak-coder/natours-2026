const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1.check if email and password exist
  if (!email || !password) {
    return next(new AppError('please provide email and password', 400));
  }
  //2.check if user exist and password correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3.if everything ok send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1.getting token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in!. Please login to get access', 401),
    );
  }
  //2.verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3.check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('the user belonging to this token doesnot exist.', 401),
    );
  }

  //4.check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('user recently changed password! please login again'),
    );
  }
  //grand access to protected routes
  req.user = currentUser;
  next();
});
// eslint-disable-next-line arrow-body-style
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles=['admin','lead-guide']
    // console.log(req.user);
    // console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(new AppError('you dont have permission to this route', 403));
    }
    next();
  };
};

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   //1.get user based on posted email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new AppError('there is no user with that email address '), 404);
//   }
//   //2.generate a random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });
//   //3.send it to users email

//   next();
// });
// exports.resetPassword = () => {};
