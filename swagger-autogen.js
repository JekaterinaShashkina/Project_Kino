const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'Blog API Documentation',
        description: '',
    },
    tags: [
        {
            name: 'User',
            description: 'Authentication endpoints',
          }, 
     ],
    host: 'localhost:3001/api',
    schemes: ['http', 'https'],
    securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Enter JWT token with **Bearer** prefix, e.g. _Bearer your_token_',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
};

swaggerAutogen(outputFile, endpointsFiles, config);