const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

// Store image in temporary RAM memory as a buffer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.updateUserPhoto = upload.single('photo');

// Resize and stream directly to Cloudinary
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // 1) CONFIGURE CLOUDINARY HERE (Inside the middleware)
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Safety log to check variables in terminal (Remove this once it works!)
  console.log('Cloud name check:', process.env.CLOUDINARY_CLOUD_NAME);

  try {
    // 2) Process the image from memory buffer using Sharp
    const buffer = await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    // 3) Upload the processed buffer directly into Cloudinary
    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'natours/users',
          public_id: `user-${req.user.id}-${Date.now()}`,
          format: 'jpg',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error Details:', error);
            return reject(error);
          }

          req.file.filename = result.secure_url;
          resolve();
        },
      );

      uploadStream.end(buffer);
    });

    next();
  } catch (err) {
    return next(
      new AppError(`Image processing failed: ${err.message || err}`, 500),
    );
  }
});

// ... rest of your file (filterObj, updateMe, etc.) remains exactly the same!

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

// update me separate route bcs used by logged in user to update username and email not password
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1.create error if user posted password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('this route is not for password use updateMyPassword'),
    );
  }
  // 2.update user document
  // whitelisting bcs no want user to change role='admin'
  const filterBody = filterObj(req.body, 'name', 'email');

  // When an image is uploaded, req.file.filename contains the secure Cloudinary link
  if (req.file) filterBody.photo = req.file.filename;

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

// delete current user update active field to false
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// do not update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
