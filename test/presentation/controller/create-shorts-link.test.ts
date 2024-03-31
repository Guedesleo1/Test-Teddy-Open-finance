import { Controller, HttpRequest } from '../../../src/presentation';
import { Result } from '../../../src/core/helpers/result';
import { ICreateShortsLinksUseCase, shortsLinksDTO } from 'src/core/interfaces/usecases/create-shorts-links-usescase';
import { CreateShortsLinkController } from '../../../src/presentation/controller/create-shorts-link-controller';

interface SutType {
  createShortsLinksStub: ICreateShortsLinksUseCase
  sut: Controller
}

const makeCreateShortsLinks = (): ICreateShortsLinksUseCase => {
  class CreateShortsLinksStub implements ICreateShortsLinksUseCase {
    async create (url: shortsLinksDTO): Promise<Result<any>> {
      return Result.ok<any>({
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
        urlShorts: 'http://localhost/FmeQNk'
      });
    }
  }

  return new CreateShortsLinksStub();
};
const makeSut = (): SutType => {
  const createShortsLinksStub = makeCreateShortsLinks();
  const sut = new CreateShortsLinkController(createShortsLinksStub);

  return {
    sut,
    createShortsLinksStub
  };
};

describe('Create Short Links Controller', () => {
  it('should return serverError if CreateShortLinks throws', async () => {
    const { sut, createShortsLinksStub } = makeSut();
    jest.spyOn(createShortsLinksStub, 'create').mockImplementationOnce(async () =>
      await Promise.reject()
    );
    const httpRequest: HttpRequest = {
      body: {
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
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
  it('should return badRequest if CreateShortLinks throws', async () => {
    const { sut, createShortsLinksStub } = makeSut();
    jest.spyOn(createShortsLinksStub, 'create').mockImplementationOnce(async () =>
      await Promise.resolve(Result.fail('URL shorts not exists.'))
    );
    const httpRequest: HttpRequest = {
      body: {
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
      },
      request: {
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
      }
    };
    const response = await sut.handle(httpRequest);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toBe(400);

    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toEqual('URL shorts not exists.');
  });
  it('should call CreateShortLinks with correct values', async () => {
    const { sut, createShortsLinksStub } = makeSut();
    const createShortsLinksSpy = jest.spyOn(createShortsLinksStub, 'create');
    const httpRequest: HttpRequest = {
      body: {
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
      },
      request: {
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
      }
    };

    await sut.handle(httpRequest);
    expect(createShortsLinksSpy).toBeCalledWith({
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
    });
  });
  it('should return token on success', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      body: {
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
      },
      request: {
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
      }
    };
    const response = await sut.handle(httpRequest);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toBe(200);
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('userId');
    expect(response.body.data).toHaveProperty('url');
    expect(response.body.data).toHaveProperty('urlShorts');
  });
});
