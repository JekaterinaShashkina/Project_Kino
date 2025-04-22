const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'Kino Project API Documentation',
        description: '',
    },
    host: 'localhost:3001',
    schemes: ['http', 'https'],
    tags: [
        {
            name: 'Categories',
            description: 'Categories endpoints',
        },
        {
            name: 'User',
            description: 'Authentication endpoints',
        }, 
        {
            name: 'Hall',
            description: 'Hall endpoints',
        },
        {
            name: 'Movie',
            description: 'Movie endpoints',
        },  
        {
            name: 'Session',
            description: 'Session endpoints',
        }, 
    ],

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