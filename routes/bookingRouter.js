const express = require('express');

const router = express.Router();

const bookingController = require('../controllers/bookingController');

const authController = require('../controllers/authController');

router.get(
  '/checkout-session/:tourID',
  authController.protect,
  bookingController.getCheckoutSession,
);
router.route('/').get(authController.protect, bookingController.getAllBooking);

module.exports = router;
