import {
  modelSchema,
  pathSchema,
  securitySchema
} from './components';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Test-Teddy-Open-finance',
    description: 'API Documentation'
  },
  paths: pathSchema,
  security: [
    {
      BearerAuth: '#/components/security/BearerAuth'
    }
  ],
  components: {
    schemas: modelSchema,
    securitySchemes: securitySchema
  },
  consumes: ['application/json'],
  produces: ['application/json']
};
