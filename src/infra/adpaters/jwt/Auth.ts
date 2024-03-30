import jwt from 'jsonwebtoken';
import { ITokenGenerator } from 'src/core/interfaces/adapters/jwt';

export class Auth implements ITokenGenerator {
  constructor () {}

  generate (payload: any): string {
    return jwt.sign({ data: payload }, 'secret', { expiresIn: '1h' });
  }
}
