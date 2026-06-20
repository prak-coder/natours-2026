const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  // console.log(req.query);

  const queryObj = { ...req.query };
  const excludeFileds = ['page', 'sort', 'limit', 'fields'];
  excludeFileds.forEach((el) => {
    delete queryObj[el];
  });
  // console.log(queryObj);
  // console.log(req.query);

  //building the query object no db connection yet
  const query = await Tour.find(queryObj);

  // const tours = await Tour.find({ duration: 5, difficulty: 'easy' });
  //   .where('duration')
  //   .equals(5)
  //   .where('difficulty')
  //   .equals('easy');

  //executing query..actual docu from db
  const tours = await query;

  //sending the response
  res.status(200).json({
    status: 'success',
    requestAtTime: req.RequestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

//post req same url only method -post rest api rule
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      message: 'tour updated',
      data: {
        tour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
