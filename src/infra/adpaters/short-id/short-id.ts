import { generate } from 'shortid';
import { IShortId } from 'src/core/interfaces/adapters/short-id';

export class ShortId implements IShortId {
  constructor () {}

  generate (): string {
    return generate().substring(0, 6);
  }
}
