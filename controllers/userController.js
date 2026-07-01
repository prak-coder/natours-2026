const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');

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
