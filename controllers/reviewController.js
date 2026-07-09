const review = require('../models/reviewModel');

const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await review.find();
  if (reviews.length === 0) {
    return next(new AppError('No reviews found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await review.create(req.body);
  if (!newReview) {
    return next(new AppError('Review not created', 400));
  }
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
