const fs = require('fs');

const dns = require('node:dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);
//Many local ISP routers or default network setups cannot parse
//  or handle complex SRV lookups correctly.
const mongoose = require('mongoose');

const dotenv = require('dotenv');

// dotenv.config({ path: './config.env' });
dotenv.config({ path: `${__dirname}/../../config.env` });

const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

// console.log(tours);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB sucessfully connected');
  })
  .catch((err) => {
    console.error('DB connection error:', err.message);
  });

const importData = async (req, res) => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('data imported to DB');
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, res) => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('data deleted in DB');
  } catch (error) {
    console.log(error);
  }
};

// console.log(process.argv[2]);
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
