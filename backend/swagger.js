const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

module.exports = (app) => {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};