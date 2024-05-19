import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Guestara Nitesh Kumar Reddy Assigment submission',
        version: '1.0.0',
        description: 'Details About the Apis',
      },
    },
    apis: ['./Routes/*.js'], // Path to  API routes
  };
  
  const specs = swaggerJsdoc(options);
  export  {options,specs};