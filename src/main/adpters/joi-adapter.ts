import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export class JoiAdapter {
  static adapt (schema: Joi.ObjectSchema<any>): any {
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        await schema.validateAsync(request.body, { abortEarly: false });
        next();
      } catch (error: any) {
        const errorMessage = error.details.map((detail: any) => detail.message.replace(/\\/g, '').replace(/"/g, ''));
        return response.status(400).json({ message: errorMessage });
      }
    };
  }
}
