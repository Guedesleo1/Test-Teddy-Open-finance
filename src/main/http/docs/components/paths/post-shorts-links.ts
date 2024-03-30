export default {
  post: {
    tags: [
      'Shorts Links'
    ],
    summary: 'Create Shorts Links',
    description: 'Create Shorts Links',
    requestBody: {
      description: 'Create Shorts Links',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/shortLinks'
          }
        },
        'application/xml': {
          schema: {
            $ref: '#/components/schemas/shortLinks'
          }
        }
      },
      required: true
    },
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/responsePostShortLinks'
            }
          }
        }
      },
      400: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'UrL already exists'
                }
              }
            }
          }
        }

      },
      401: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Invalid token.'
                }
              }
            }
          }
        }

      },
      500: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Internal server error.'
                }
              }
            }
          }
        }

      }
    }
  }
};
