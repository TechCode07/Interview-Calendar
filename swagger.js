const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Interview Calendar API',
        version: '1.0.0',
        description: 'API to manage and query interview slots',
    },
    servers: [
        {
            url: 'http://localhost:5001',
            description: 'Local server',
        },
    ],
    tags: [
        {
            name: "User",
            description: "User regisgration and Login"
        }, {
            name: "Interview",
            description: "Chek user avaialbility and interview slots"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [
        {
            bearerAuth: [],
        }
    ],
};

// Swagger options for jsdoc
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);


module.exports = {
    swaggerSpec,
    swaggerUi
};