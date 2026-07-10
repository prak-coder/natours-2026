const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const tourController = require('../controllers/tourController');

const reviewController = require('../controllers/reviewController');

//param middleware
// router.param('id', tourController.checkId);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/tour-monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );
// nested route
//post /tour/234fad4/reviews
//get /tour/25546/reviews
///get /tour/25546/reviews/1546 specific review
router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview,
  );

module.exports = router;
