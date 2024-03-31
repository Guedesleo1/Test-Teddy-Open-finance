import { UsersDomain } from '@entities/users-domain';
import { Encrypter } from '../../../src/core/interfaces/adapters/encrypter';
import { IdGenerator } from '../../../src/core/interfaces/adapters/id-generator';
import { IUserRepository } from '../../../src/core/interfaces/repositories/users-repository';
import { ICreateUserUseCase } from '../../../src/core/interfaces/usecases/create-users-usecase';
import { CreateUserUseCase } from '../../../src/core/modules/create-users-usecase';

interface SutType {
  idGeneratorStub: IdGenerator
  encrypterStub: Encrypter
  usersRepositoryStub: IUserRepository
  sut: ICreateUserUseCase
}
const makeIdGenerate = (): IdGenerator => {
  class IdGeneratorStub implements IdGenerator {
    random () {
      return '12321313131';
    }
  }
  return new IdGeneratorStub();
};

const makeUsersRepository = (): IUserRepository => {
  class UsersRepositoryStub implements IUserRepository {
    async create (login: any): Promise<any> {
      return await Promise.resolve({
        name: 'Leonardo',
        email: 'leonardo@testesteddyopenfinance.com.br',
        password: '123456'
      });
    }

    async exists ({ email }: { email: string }): Promise<boolean> {
      return await new Promise((resolve) => resolve(false));
    }

    async findByEmail (email: string): Promise<UsersDomain | null> {
      return await Promise.resolve({
        name: 'Leonardo',
        email: 'leonardo@testesteddyopenfinance.com.br',
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
  const idGeneratorStub = makeIdGenerate();
  const encrypterStub = makeEncrypter();
  const usersRepositoryStub = makeUsersRepository();

  const sut = new CreateUserUseCase({
    userRepo: usersRepositoryStub,
    encrypter: encrypterStub,
    idGenerator: idGeneratorStub
  });

  return {
    sut,
    idGeneratorStub,
    encrypterStub,
    usersRepositoryStub
  };
};

describe('Create Users UseCase', () => {
  it('Should be idGeneratorStub.random to be called with correct params', async () => {
    const { idGeneratorStub, sut } = makeSut();

    const idGeneratorSpy = jest.spyOn(idGeneratorStub, 'random');

    await sut.create({
      name: 'Leonardo',
      email: 'leonardo@testesteddyopenfinance.com.br',
      password: '123456'
    });

    expect(idGeneratorSpy).toHaveBeenCalledTimes(1);
  });

  it('Should be encrypterStub.hash to be called with correct params', async () => {
    const { encrypterStub, sut } = makeSut();

    const encrypterSpy = jest.spyOn(encrypterStub, 'hash');

    await sut.create({
      name: 'Leonardo',
      email: 'leonardo@testesteddyopenfinance.com.br',
      password: '123456'
    });

    expect(encrypterSpy).toHaveBeenCalledTimes(1);
    expect(encrypterSpy).toHaveBeenCalledWith('123456');
  });

  it('Should be usersRepositoryStub.exists to be called with correct params', async () => {
    const { usersRepositoryStub, sut } = makeSut();

    const usersRepositorySpy = jest.spyOn(usersRepositoryStub, 'exists');

    await sut.create({
      name: 'Leonardo',
      email: 'leonardo@testesteddyopenfinance.com.br',
      password: '123456'
    });

    expect(usersRepositorySpy).toHaveBeenCalledTimes(1);
    expect(usersRepositorySpy).toHaveBeenCalledWith({ email: 'LEONARDO@TESTESTEDDYOPENFINANCE.COM.BR' });
  });

  it('Should be usersRepositoryStub.exists, users exists', async () => {
    const { usersRepositoryStub, sut } = makeSut();

    jest.spyOn(usersRepositoryStub, 'exists').mockImplementationOnce(async () => {
      return await Promise.resolve(true);
    });

    const response = await sut.create({
      name: 'Leonardo',
      email: 'leonardo@testesteddyopenfinance.com.br',
      password: '123456'
    });

    expect(response.isSuccess).toBeFalsy();
    expect(response.isFailure).toBeTruthy();
    expect(response.error).toEqual('User already exists');
  });

  it('Should be usersRepositoryStub.create to be called with correct params', async () => {
    const { usersRepositoryStub, sut } = makeSut();

    const usersRepositorySpy = jest.spyOn(usersRepositoryStub, 'create');

    await sut.create({
      name: 'Leonardo',
      email: 'leonardo@testesteddyopenfinance.com.br',
      password: '123456'
    });

    expect(usersRepositorySpy).toHaveBeenCalledTimes(1);
    expect(usersRepositorySpy).toHaveBeenCalledWith({
      email: 'leonardo@testesteddyopenfinance.com.br',
      name: 'Leonardo',
      password: '1$343421',
      userId: '12321313131'
    });
  });
});
