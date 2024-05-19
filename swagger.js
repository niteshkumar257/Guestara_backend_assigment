import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Swagger Express API',
        version: '1.0.0',
        description: 'A simple Express API with Swagger documentation',
      },
    },
    apis: ['./Routes/*.js'], // Path to  API routes
  };
  
  const specs = swaggerJsdoc(options);
  export  {options,specs};