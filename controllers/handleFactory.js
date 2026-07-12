const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document with that id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      message: 'doc updated',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    // eslint-disable-next-line no-unused-vars
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;
    if (!doc) {
      return next(new AppError('No document with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //using a apifeatures obj to create inst bcs can be reused for any resource(user,review etc)
    // console.log(req.query);

    //all reviews for a tour hack for review
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    //executing query..actual docu from db
    const doc = await features.query;

    //sending the response
    res.status(200).json({
      status: 'success',
      requestAtTime: req.RequestTime,
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
