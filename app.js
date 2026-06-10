const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

//1) MIDDLEWARE
app.use(express.json());

app.use(morgan('dev'));
//own middleware
app.use((req, res, next) => {
  console.log('Hello from Middle ware');
  next();
});

//another middle ware
app.use((req, res, next) => {
  req.RequestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server', app: 'natours' });
// });
// app.post('/', (req, res) => {
//   res.send('you can post at this end point..');
// });

//2)HANDLER FUNCTIONS

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAtTime: req.RequestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  const tourId = req.params.id * 1;
  const tour = tours.find((el) => el.id === tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Tour ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

//post req same url only method -post rest api rule
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here..>',
      },
    });
  }
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemented',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemented',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemented',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemented',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is yet to be implemented',
  });
};
//3)ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter
  .route('/:id', tourRouter)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.use('/api/v1/users', userRouter);
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//4)START THE SERVER

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
