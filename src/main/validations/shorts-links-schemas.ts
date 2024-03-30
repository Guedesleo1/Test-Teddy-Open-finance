import Joi from 'joi';

export const shortsLinksSchemas = Joi.object({
  url: Joi.string().required()
});
