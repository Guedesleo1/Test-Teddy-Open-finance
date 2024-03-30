import { Result } from '../helpers/result';
import { Encrypter } from '../interfaces/adapters/encrypter';
import { ITokenGenerator } from '../interfaces/adapters/jwt';
import { IUserRepository } from '../interfaces/repositories/users-repository';
import { ICreateTokenUseCase, IResponseCreateToken, lokenCreateDTO } from '../interfaces/usecases/Icrate-token-usecase';

export interface CreateTokenConstructor {
  userRepo: IUserRepository
  encrypter: Encrypter
  jwt: ITokenGenerator
}

export class CreateTokenUseCase implements ICreateTokenUseCase {
  private readonly userRepopository: IUserRepository;
  private readonly encrypter: Encrypter;
  private readonly jwt: ITokenGenerator;

  constructor ({ userRepo, encrypter, jwt }: CreateTokenConstructor) {
    this.userRepopository = userRepo;
    this.encrypter = encrypter;
    this.jwt = jwt;
  }

  async create (token: lokenCreateDTO): Promise<Result<IResponseCreateToken>> {
    const loginExists = await this.userRepopository.findByEmail(token.email);

    if (!loginExists) {
      return Result.fail('Email invalid');
    }

    const isMatch = await this.encrypter.compare({
      password: token.password,
      hash: loginExists.password
    });
    if (!isMatch) {
      return Result.fail('Password invalid');
    }

    const accessToken = this.jwt.generate(loginExists);

    return Result.ok({ accessToken });
  }
}
