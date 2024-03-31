export default {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Leonardo'
    },
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
    name: 'users'
  }
};
