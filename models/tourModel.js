/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');

const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour should have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
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
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
tourSchema.virtual('durationinweeks').get(function () {
  return this.duration / 7;
});
//document middleware only work for save and create mongodb method not insert/update
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//can have mutiple middlewares
// tourSchema.pre('save', (next) => {
//   console.log('will run before save');
//   next();
// });

tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
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
