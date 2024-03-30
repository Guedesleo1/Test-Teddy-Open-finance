import { compare, hash } from 'bcrypt';
import { Encrypter } from 'src/core/interfaces/adapters/encrypter';

export class Bcrypt implements Encrypter {
  async hash (password: string): Promise<string> {
    return await hash(password, 12);
  }

  async compare ({
    password,
    hash
  }: {
    password: string
    hash: string
  }): Promise<boolean> {
    return await compare(password, hash);
  }
}
