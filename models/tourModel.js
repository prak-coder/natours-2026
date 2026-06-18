const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour should have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour should have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour should have maxgroupsize'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour should have difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A true should have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, 'A true should have a summary'],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A true should have a imageCover'],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
// const testTour = new Tour({
//   name: 'vellore tour test',
//   rating: 5,
//   price: 500,
// });

// testTour
//   .save()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log('Error 🧨 ', err);
//   });
