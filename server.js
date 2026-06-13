const dns = require('node:dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);
//Many local ISP routers or default network setups cannot parse
//  or handle complex SRV lookups correctly.

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour should have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A true should have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'vellore tour test',
  rating:5,
  price: 500,
});

testTour
  .save()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log('Error 🧨 ', err);
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
