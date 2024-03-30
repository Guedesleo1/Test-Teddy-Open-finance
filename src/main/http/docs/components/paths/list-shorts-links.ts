export default {
  get: {
    tags: [
      'Shorts Links'
    ],
    summary: 'List All Shorts Links',
    description: 'List All Shorts Links',
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/responseListShortLinks'
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
