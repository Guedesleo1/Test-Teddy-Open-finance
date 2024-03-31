export default {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'leonardo@gmail.com.br'
    },
    password: {
      type: 'string',
      example: '123456'
    }
  },
  xml: {
    name: 'token'
  }
};
