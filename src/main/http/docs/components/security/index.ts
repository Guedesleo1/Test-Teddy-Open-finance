export const securitySchema = {
  BearerAuth: {
    type: 'http',
    scheme: 'bearer',
    name: 'x-access-token',
    description: 'API Token must be provided via Authorization:  header',
    in: 'header'
  }
};
