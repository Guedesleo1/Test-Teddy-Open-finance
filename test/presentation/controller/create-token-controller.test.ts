import { ICreateTokenUseCase, IResponseCreateToken, lokenCreateDTO } from 'src/core/interfaces/usecases/crate-token-usecase';
import { CreateTokenController } from '../../../src/presentation/controller/create-token-controller';
import { Controller, HttpRequest } from '../../../src/presentation';
import { Result } from '../../../src/core/helpers/result';

interface SutType {
  createTokenStub: ICreateTokenUseCase
  sut: Controller
}

const makeCreateToken = (): ICreateTokenUseCase => {
  class CreateTokenStub implements ICreateTokenUseCase {
    async create (token: lokenCreateDTO): Promise<Result<IResponseCreateToken>> {
      return Result.ok<IResponseCreateToken>({
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjlkYzM5ZjQ0LWI0ZWQtNDM5NC1hOGI5LTE2ODM3YjI2ZWEyYiIsIm5hbWUiOiJMZW9uYXJkbyIsImVtYWlsIjoibGVvbmFyZG9AZ21haWwuY29tLmJyIiwicGFzc3dvcmQiOiIkMmIkMTIkWXZ0ay5kamozaXRsR0JickVxVHJ6T2JUNTFFV3h3aVBpeFFYdTcwd0taN29uMXlOVHVnMkciLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTI4VDAzOjIzOjAzLjAwMFoifSwiaWF0IjoxNzExNTg5OTUzLCJleHAiOjE3MTE1OTM1NTN9.HbjCEk1bHKI0-pMGPrs1R9s4QYCqJ_DAURfWYBFuNeM'
      });
    }
  }

  return new CreateTokenStub();
};
const makeSut = (): SutType => {
  const createTokenStub = makeCreateToken();
  const sut = new CreateTokenController(createTokenStub);

  return {
    sut,
    createTokenStub
  };
};

describe('Create token Controller', () => {
  it('should return serverError if CreateToken throws', async () => {
    const { sut, createTokenStub } = makeSut();
    jest.spyOn(createTokenStub, 'create').mockImplementationOnce(async () =>
      await Promise.reject()
    );
    const httpRequest: HttpRequest = {
      body: {
        email: 'anyMail@mail.com',
        password: 'any_password'
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
  it('should return badRequest if CreateToken throws', async () => {
    const { sut, createTokenStub } = makeSut();
    jest.spyOn(createTokenStub, 'create').mockImplementationOnce(async () =>
      await Promise.resolve(Result.fail('Password invalid'))
    );
    const httpRequest: HttpRequest = {
      body: {
        email: 'anyMail@mail.com',
        password: 'any_password'
      }
    };
    const response = await sut.handle(httpRequest);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toBe(400);

    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toEqual('Password invalid');
  });
  it('should call createToken with correct values', async () => {
    const { sut, createTokenStub } = makeSut();
    const createUserSpy = jest.spyOn(createTokenStub, 'create');
    const httpRequest: HttpRequest = {
      body: {
        email: 'anyMail@mail.com',
        password: 'any_password'
      }
    };

    await sut.handle(httpRequest);
    expect(createUserSpy).toBeCalledWith({
      email: 'anyMail@mail.com',
      password: 'any_password'
    });
  });
  it('should return token on success', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      body: {
        email: 'anyMail@mail.com',
        password: 'any_password'
      }
    };
    const response = await sut.handle(httpRequest);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toBe(200);
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('accessToken');
  });
});
