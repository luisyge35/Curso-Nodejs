const { countries, languages } = require('countries-list');
const { info } = require('../modules/my-log');

const routes = app => {
  app.get('/', (request, response) => {
    response.status(200).send('HELLO');
  });

  app.get('/info', (request, response) => {
    // Te puedes ahorrar poner el 200
    info('hola info');
    response.send('info nodemon');
  });

  app.get('/country', (request, response) => {
    console.log(request.query);
    response.json(countries[request.query.code]);
  });

  app.get('/languages/:lang', (request, response) => {
    console.log(request.query);
    const lang = languages[request.params.lang];
    if (lang) {
      response.json({
        status: 'OK',
        message: lang,
      });
    }
    response.status(404).json({
      status: 'NOT FOUND',
      message: `language ${request.params.lang}does not exist`,
    });
  });

  app.get('*', (request, response) => {
    response.status(404).send('NOT FOUND');
  });
};

module.exports.routes = routes;
