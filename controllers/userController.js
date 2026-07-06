const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  //sending the response
  res.status(200).json({
    status: 'success',
    requestAtTime: req.RequestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemented',
  });
};
//update me seperate route bcs used by logged in user to update username and email not password
exports.updateMe = (req, res, next) => {
  //1.create error if user posted password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('this route is not for password use updateMyPassword'),
    );
  }
  //2.update user document
  next();
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemented',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemented',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemented',
  });
};
