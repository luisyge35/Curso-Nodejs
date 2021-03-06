const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routesV1 = require('./routes/v1/index');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
console.log('MONGO: ', process.env.MONGO);
routesV1(app);
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  usefindByIdAndUpdate: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`running on: ${PORT}`);
  });
}).catch(error => {
  console.log('MongoDB error: ', error);
});