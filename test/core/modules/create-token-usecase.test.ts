import { UsersDomain } from '@entities/users-domain';
import { Encrypter } from '../../../src/core/interfaces/adapters/encrypter';
import { ITokenGenerator } from '../../../src/core/interfaces/adapters/jwt';
import { IUserRepository } from '../../../src/core/interfaces/repositories/users-repository';
import { ICreateTokenUseCase } from '../../../src/core/interfaces/usecases/crate-token-usecase';
import { CreateTokenUseCase } from '../../../src/core/modules/create-token-usecase';

interface SutType {
  jwtStub: ITokenGenerator
  encrypterStub: Encrypter
  userRepositoryStub: IUserRepository
  sut: ICreateTokenUseCase
}
const makeJwt = (): ITokenGenerator => {
  class JwtStub implements ITokenGenerator {
    generate (payload: any): string {
      return '1234#5412';
    }
  }
  return new JwtStub();
};

const makeUsersRepository = (): IUserRepository => {
  class UsersRepositoryStub implements IUserRepository {
    async create (users: any): Promise<any> {
      return await Promise.resolve({
        name: 'Leonardo',
        email: 'leonardo@testeteddyopenfinance.com.br',
        password: '123456'
      });
    }

    async exists ({ email }: { email: string }): Promise<boolean> {
      return await new Promise((resolve) => resolve(false));
    }

    async findByEmail (url: string): Promise<UsersDomain | null> {
      return await Promise.resolve({
        name: 'Leonardo',
        email: 'leonardo@testeteddyopenfinance.com.br',
        password: '123456'
      });
    }
  }
  return new UsersRepositoryStub();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async hash (password: string): Promise<string> {
      return await new Promise((resolve) => resolve('1$343421'));
    }

    async compare ({
      password,
      hash
    }: {
      password: string
      hash: string
    }): Promise<boolean> {
      return await new Promise((resolve) => resolve(true));
    }
  }
  return new EncrypterStub();
};

const makeSut = (): SutType => {
  const jwtStub = makeJwt();
  const encrypterStub = makeEncrypter();
  const userRepositoryStub = makeUsersRepository();

  const sut = new CreateTokenUseCase({
    userRepo: userRepositoryStub,
    encrypter: encrypterStub,
    jwt: jwtStub
  });

  return {
    sut,
    jwtStub,
    encrypterStub,
    userRepositoryStub
  };
};

describe('Create Token UseCase', () => {
  it('Should be userRepositoryStub.findByEmail to be called with correct params', async () => {
    const { userRepositoryStub, sut } = makeSut();

    const userRepositorySpy = jest.spyOn(userRepositoryStub, 'findByEmail');

    await sut.create({
      email: 'leonardo@testeteddyopenfinance.com.br',
      password: '123456'
    });

    expect(userRepositorySpy).toHaveBeenCalledTimes(1);
    expect(userRepositorySpy).toHaveBeenCalledWith('leonardo@testeteddyopenfinance.com.br');
  });

  it('Should be userRepositoryStub.findByEmail to be not email exists', async () => {
    const { userRepositoryStub, sut } = makeSut();

    jest.spyOn(userRepositoryStub, 'findByEmail').mockImplementationOnce(async () => {
      return await Promise.resolve(null);
    });

    const response = await sut.create({
      email: 'leonardo@testeteddyopenfinance.com.br',
      password: '123456'
    });

    expect(response.isSuccess).toBeFalsy();
    expect(response.isFailure).toBeTruthy();
    expect(response.error).toEqual('Email invalid');
  });

  it('Should be encrypterStub.compare to be called with correct params', async () => {
    const { encrypterStub, sut } = makeSut();

    const encrypterSpy = jest.spyOn(encrypterStub, 'compare');

    await sut.create({
      email: 'leonardo@testeteddyopenfinance.com.br',
      password: '123456'
    });

    expect(encrypterSpy).toHaveBeenCalledTimes(1);
    expect(encrypterSpy).toHaveBeenCalledWith({ hash: '123456', password: '123456' });
  });

  it('Should be encrypterStub.compare isMatch false', async () => {
    const { encrypterStub, sut } = makeSut();

    jest.spyOn(encrypterStub, 'compare').mockImplementationOnce(async () => {
      return await Promise.resolve(false);
    });

    const response = await sut.create({
      email: 'leonardo@testeteddyopenfinance.com.br',
      password: '123456'
    });

    expect(response.isSuccess).toBeFalsy();
    expect(response.isFailure).toBeTruthy();
    expect(response.error).toEqual('Password invalid');
  });

  it('Should be jwtStub.generate to be called with correct params', async () => {
    const { jwtStub, sut } = makeSut();

    const jwtSpy = jest.spyOn(jwtStub, 'generate');

    await sut.create({
      email: 'leonardo@testeteddyopenfinance.com.br',
      password: '123456'
    });

    expect(jwtSpy).toHaveBeenCalledTimes(1);
    expect(jwtSpy).toHaveBeenCalledWith({ email: 'leonardo@testeteddyopenfinance.com.br', name: 'Leonardo', password: '123456' });
  });
});
