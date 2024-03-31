import { Controller, HttpRequest } from '../../../src/presentation';
import { Result } from '../../../src/core/helpers/result';
import { ICounterShortsLinkUseCase } from 'src/core/interfaces/usecases/counter-shorts-links-usecase';
import { CounterShortsLinkController } from '../../../src/presentation/controller/counter-shorts-link.controller';

interface SutType {
  counterShortsLinksStub: ICounterShortsLinkUseCase
  sut: Controller
}

const makeCounterShortsLinks = (): ICounterShortsLinkUseCase => {
  class CounterShortsLinksStub implements ICounterShortsLinkUseCase {
    async update (code: string): Promise<Result<any>> {
      return Result.ok<any>({
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
      });
    }
  }

  return new CounterShortsLinksStub();
};
const makeSut = (): SutType => {
  const counterShortsLinksStub = makeCounterShortsLinks();
  const sut = new CounterShortsLinkController(counterShortsLinksStub);

  return {
    sut,
    counterShortsLinksStub
  };
};

describe('Counter Short Links Controller', () => {
  it('should return serverError if CounterShortLinks throws', async () => {
    const { sut, counterShortsLinksStub } = makeSut();
    jest.spyOn(counterShortsLinksStub, 'update').mockImplementationOnce(async () =>
      await Promise.reject()
    );
    const httpRequest: HttpRequest = {
      params: {
        code: 'FmeQNk'
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
  it('should return badRequest if CounterShortLinks throws', async () => {
    const { sut, counterShortsLinksStub } = makeSut();
    jest.spyOn(counterShortsLinksStub, 'update').mockImplementationOnce(async () =>
      await Promise.resolve(Result.fail('URL shorts not exists.'))
    );
    const httpRequest: HttpRequest = {
      params: {
        code: 'FmeQNk'
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
  it('should call CounterShortLinks with correct values', async () => {
    const { sut, counterShortsLinksStub } = makeSut();
    const counterShortsLinksSpy = jest.spyOn(counterShortsLinksStub, 'update');
    const httpRequest: HttpRequest = {
      params: {
        code: 'FmeQNk'
      }
    };

    await sut.handle(httpRequest);
    expect(counterShortsLinksSpy).toBeCalledWith(
      'FmeQNk'
    );
  });
  it('should return token on success', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        code: 'FmeQNk'
      }
    };
    const response = await sut.handle(httpRequest);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toBe(301);
    expect(response.headers).toHaveProperty('url');
    expect(response.headers.url.url).toBe('https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/');
  });
});
