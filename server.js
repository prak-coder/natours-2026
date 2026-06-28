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

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDELED REJECTION.🧨 Shutting down');
  server.close(() => {
    process.exit(1);
  });
});
