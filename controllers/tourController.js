const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: 'success',
    requestAtTime: req.RequestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  // const tourId = req.params.id * 1;
  // const tour = tours.find((el) => el.id === tourId);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

//post req same url only method -post rest api rule
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      // tour: newTour,
    },
  });
};

exports.updateTour = (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  // }
  // res.status(200).json({
  //   status: 'success',
  //   data: {

  //     tour: '<Updated tour here..>',
  //   },
  // });
};
exports.deleteTour = (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  // }
  // res.status(204).json({
  //   status: 'success',
  //   data: null,
  // });
};
