import { Request, NextFunction, Response } from 'express';
import { JsonWebTokenError, verify } from 'jsonwebtoken';

interface IPayload {
  data: object
}

export async function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new Error('Missing token.');

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') throw new Error('Invalid token.');

    const data = verify(
      token,
      'secret'
    ) as IPayload;

    Object.assign(request, data);

    next();
  } catch (error: any) {
    if (error instanceof JsonWebTokenError) {
      return response.status(401).json({ message: 'Invalid token.' });
    }

    next();
  }
}
