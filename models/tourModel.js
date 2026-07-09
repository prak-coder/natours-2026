/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');

const slugify = require('slugify');

// const User = require('./userModel');

// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour should have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'a tour name should be equal to or less than 40 characters',
      ],
      minlength: [
        10,
        'a tour name should be equal to or gretaer than 10 characters',
      ],
      // validate: [validator.isAlpha, 'tour name can only have characters'], // external custom validator
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message:
          'only values of easy medium difficult are accepted for difficulty',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      max: [5, 'ratingsAverage should be 5.0 or below'],
      min: [1, 'ratingsAverage should be 1.0 or above'],
    },
    ratingsQuantity: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A true should have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return this.priceDiscount < this.price; // 50 <100
        },
        message: 'priceDiscount should be less than price',
      },
    },
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
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocations: {
      //geo Json
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
tourSchema.virtual('durationinweeks').get(function () {
  return this.duration / 7;
});
//virtual populate tour with reviews
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});
//document middleware only work for save and create mongodb method not insert/update
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', async function (next) {
//   //console.log(this); this refer to document
//   // eslint-disable-next-line no-return-await
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

//can have mutiple middlewares
// tourSchema.pre('save', (next) => {
//   console.log('will run before save');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// Query middleware

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-v -passwordChangeAt',
  });
  next();
});
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`query took ${Date.now() - this.start} milliseconds`);
  next();
});

//aggregate middleware
tourSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
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
