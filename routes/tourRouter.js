const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const tourController = require('../controllers/tourController');

const reviewRouter = require('./reviewRouter');
//param middleware
// router.param('id', tourController.checkId);

// nested route
//post /tour/234fad4/reviews
//get /tour/25546/reviews
///get /tour/25546/reviews/1546 specific review
router.use('/:tourId/reviews', reviewRouter);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/tour-monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/tours-within/distance/:distance/latlng/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
//tours/tours-within/distance/400/latlng/34.116552,-118.225324/unit/mi
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
