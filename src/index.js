const express = require('express');
const { routes } = require('./routes/index');

const app = express();

routes(app);

app.listen(4000, () => {
  console.log('running on 4000');
});
