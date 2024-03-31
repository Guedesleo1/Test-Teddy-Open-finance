import { Controller, HttpRequest } from '../../../src/presentation';
import { Result } from '../../../src/core/helpers/result';
import { ICreateUserUseCase, usersCreateDTO } from 'src/core/interfaces/usecases/create-users-usecase';
import { CreateUsersController } from '../../../src/presentation/controller/create-users-controller';

interface SutType {
  createUsersStub: ICreateUserUseCase
  sut: Controller
}

const makeCreateUsers = (): ICreateUserUseCase => {
  class CreateUsersStub implements ICreateUserUseCase {
    async create (user: usersCreateDTO): Promise<Result<any>> {
      return Result.ok<any>({
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
        email: 'testes@teddyopenfinance.com',
        name: 'teddyopenfinance',
        password: '$2b$12$B4aaNcxWs.MQVv/9WYkSPu2SilVSlpVqLLV75FWIAGZJQ4c1FK/xm'
      });
    }
  }

  return new CreateUsersStub();
};
const makeSut = (): SutType => {
  const createUsersStub = makeCreateUsers();
  const sut = new CreateUsersController(createUsersStub);

  return {
    sut,
    createUsersStub
  };
};

describe('Create Users Controller', () => {
  it('should return serverError if CreateUsers throws', async () => {
    const { sut, createUsersStub } = makeSut();
    jest.spyOn(createUsersStub, 'create').mockImplementationOnce(async () =>
      await Promise.reject()
    );
    const httpRequest: HttpRequest = {
      body: {
        email: 'anyMail@mail.com',
        password: 'any_password',
        name: 'any_name'
      }
    };
    const response = await sut.handle(httpRequest);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toBe(500);

    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toEqual('Internal Server Error');
  });
  it('should return badRequest if CreateUsers throws', async () => {
    const { sut, createUsersStub } = makeSut();
    jest.spyOn(createUsersStub, 'create').mockImplementationOnce(async () =>
      await Promise.resolve(Result.fail('User already exists'))
    );
    const httpRequest: HttpRequest = {
      body: {
        email: 'anyMail@mail.com',
        password: 'any_password',
        name: 'any_name'
      }
    };
    const response = await sut.handle(httpRequest);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toBe(400);

    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toEqual('User already exists');
  });
  it('should call CreateUsers with correct values', async () => {
    const { sut, createUsersStub } = makeSut();
    const createUserSpy = jest.spyOn(createUsersStub, 'create');
    const httpRequest: HttpRequest = {
      body: {
        email: 'anyMail@mail.com',
        password: 'any_password',
        name: 'any_name'
      }
    };

    await sut.handle(httpRequest);
    expect(createUserSpy).toBeCalledWith({
      email: 'anyMail@mail.com',
      password: 'any_password',
      name: 'any_name'
    });
  });
  it('should return token on success', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      body: {
        email: 'anyMail@mail.com',
        password: 'any_password',
        name: 'any_name'
      }
    };
    const response = await sut.handle(httpRequest);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toBe(200);
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.value).toHaveProperty('email');
    expect(response.body.data.value).toHaveProperty('password');
    expect(response.body.data.value).toHaveProperty('name');
    expect(response.body.data.value).toHaveProperty('userId');
  });
});
