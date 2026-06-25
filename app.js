const express = require('express');

const app = express();

const morgan = require('morgan');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

//1) MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

//middle to serve static files
app.use(express.static(`${__dirname}/public`));
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

//3)ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
