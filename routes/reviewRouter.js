const express = require('express');

const router = express.Router();

const reviewController = require('../controllers/reviewController');

// const userController = require('../controllers/userController');

const authController = require('../controllers/authController');

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);

// router.post('/forgotPassword', authController.forgotPassword);

// router.patch('/resetPassword/:token', authController.resetPassword);

// router.patch(
//   '/updateMyPassword',
//   authController.protect,
//   authController.updatePassword,
// );
// router.patch('/updateMe', authController.protect, userController.updateMe);
// router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview,
  );
// router.route('/:id');
//   .get(reviewController.getReview)
//   .patch(reviewController.updateReview)
//   .delete(reviewController.deleteReview);

module.exports = router;
