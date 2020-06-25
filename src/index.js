const express = require('express');
const bodyParser = require('body-parser');
const routesV1 = require('./routes/v1/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routesV1(app);
app.listen(4000, () => {
  console.log('running on 4000');
});
