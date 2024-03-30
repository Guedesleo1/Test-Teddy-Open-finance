import token from './token';
import users from './users';
import shortLinks from './shorts-links';

export const modelSchema = {
  token,
  users,
  shortLinks,
  reponseUsers: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          isSuccess: {
            type: 'boolean',
            example: true
          },
          isFailure: {
            type: 'boolean',
            example: false
          },
          value: {
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
                example: '$2b$12$B4aaNcxWs.MQVv/9WYkSPu2SilVSlpVqLLV75FWIAGZJQ4c1FK/xm'
              },
              userId: {
                type: 'string',
                example: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
              }
            }
          }
        }
      }
    }
  },
  responsesToken: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjlkYzM5ZjQ0LWI0ZWQtNDM5NC1hOGI5LTE2ODM3YjI2ZWEyYiIsIm5hbWUiOiJMZW9uYXJkbyIsImVtYWlsIjoibGVvbmFyZG9AZ21haWwuY29tLmJyIiwicGFzc3dvcmQiOiIkMmIkMTIkWXZ0ay5kamozaXRsR0JickVxVHJ6T2JUNTFFV3h3aVBpeFFYdTcwd0taN29uMXlOVHVnMkciLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4VDAzOjIzOjAzLjAwMFoifSwiaWF0IjoxNzExNTg5OTUzLCJleHAiOjE3MTE1OTM1NTN9.HbjCEk1bHKI0-pMGPrs1R9s4QYCqJ_DAURfWYBFuNeM'
          }
        }
      }
    }
  },
  responsePostShortLinks: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            example: 'eyJ'
          },
          url: {
            type: 'string',
            example: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
          },
          urlShorts: {
            type: 'string',
            example: 'http://localhost/FmeQNk'
          }
        }
      }
    }
  },
  responseListShortLinks: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1
            },
            userId: {
              type: 'string',
              example: 'e23ad2ea-bd50-448f-a3c3-b533b72858de'
            },
            url: {
              type: 'string',
              example: 'https://www.youtube.com/'
            },
            urlShorts: {
              type: 'string',
              example: 'http://localhost/RcKaOy'
            },
            clicksNumber: {
              type: 'number',
              example: 1
            },
            createdAt: {
              type: 'string',
              example: '2024-03-30T14:53:29.500Z'
            },
            updatedAt: {
              type: 'string',
              example: '2024-03-30T14:53:29.500Z'
            },
            deletedAt: {
              type: 'string',
              example: null
            }
          }
        }
      }
    }
  },
  responsesDeleteShortLinks: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1
          }
        }
      }
    }
  },
  responsePostCounterShortLinks: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1
          },
          userId: {
            type: 'string',
            example: 'e23ad2ea-bd50-448f-a3c3-b533b72858de'
          },
          url: {
            type: 'string',
            example: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
          },
          urlShorts: {
            type: 'string',
            example: 'http://localhost/FmeQNk'
          },
          clicksNumber: {
            type: 'number',
            example: 1
          },
          createdAt: {
            type: 'string',
            example: '2024-03-30T14:53:29.500Z'
          },
          updatedAt: {
            type: 'string',
            example: '2024-03-30T14:53:29.500Z'
          },
          deletedAt: {
            type: 'string',
            example: null
          }
        }
      }
    }
  },
  ApiResponse: {
    type: 'object',
    properties: {
      code: {
        type: 'integer',
        format: 'int32'
      },
      type: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    },
    xml: {
      name: '##default'
    }
  }
};
