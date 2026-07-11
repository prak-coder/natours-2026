const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

const factory = require('./handleFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemeted please use /signup instead',
  });
};
//update me seperate route bcs used by logged in user to update username and email not password
exports.updateMe = catchAsync(async (req, res, next) => {
  //1.create error if user posted password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('this route is not for password use updateMyPassword'),
    );
  }
  //2.update user document
  //white listing bcs no want user to change role='admin'
  const filterBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

//delete current user update active field to false
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
//do not update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
