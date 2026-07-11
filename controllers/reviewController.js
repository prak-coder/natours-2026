const Review = require('../models/reviewModel');

const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

const factory = require('./handleFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  //all reviews for a tour
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  //for nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
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

exports.deleteReview = factory.deleteOne(Review);
