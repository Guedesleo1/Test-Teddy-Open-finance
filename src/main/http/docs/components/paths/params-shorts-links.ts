export default {
  put: {
    tags: [
      'Shorts Links'
    ],
    summary: 'Update Shorts Links',
    description: 'Update Shorts Links',
    parameters: [
      {
        name: 'code',
        in: 'path',
        description: 'ID of short Links to delete',
        required: true,
        schema: {
          type: 'string'
        }

      }
    ],
    requestBody: {
      description: 'Create Shorts Links',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                example: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
              }
            }
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
              $ref: '#/components/schemas/responsePostCounterShortLinks'
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
  },
  delete: {
    tags: [
      'Shorts Links'
    ],
    summary: 'Delete Shorts Links',
    description: 'Delete Shorts Links',
    parameters: [
      {
        name: 'code',
        in: 'path',
        description: 'ID of short Links to delete',
        required: true,
        schema: {
          type: 'string'
        }

      }
    ],
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/responsesDeleteShortLinks'
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
