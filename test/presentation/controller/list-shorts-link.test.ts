import { Controller, HttpRequest } from '../../../src/presentation';
import { Result } from '../../../src/core/helpers/result';
import { ICreateShortsLinksUseCase, shortsLinksDTO } from 'src/core/interfaces/usecases/create-shorts-links-usescase';
import { CreateShortsLinkController } from '../../../src/presentation/controller/create-shorts-link-controller';
import { ICounterShortsLinkUseCase } from 'src/core/interfaces/usecases/counter-shorts-links-usecase';
import { CounterShortsLinkController } from '../../../src/presentation/controller/counter-shorts-link.controller';
import { IDeleteShortsLinkUseCase } from 'src/core/interfaces/usecases/delete-shorts-links-usecase';
import { DeleteShortsLinkController } from '../../../src/presentation/controller/delete-shorts-link-controller';
import { IListShortsLinkUseCase } from 'src/core/interfaces/usecases/list-shorts-links-usecase';
import { ListShortsLinkController } from '../../../src/presentation/controller/list-shorts-link-controller';

interface SutType {
  listShortsLinksStub: IListShortsLinkUseCase
  sut: Controller
}

const makeListShortsLinks = (): IListShortsLinkUseCase => {
  class ListShortsLinksStub implements IListShortsLinkUseCase {
    async list (): Promise<Result<any>> {
      return Result.ok<any>([
        {
          id: 1,
          userId: 'e23ad2ea-bd50-448f-a3c3-b533b72858de',
          url: 'https://www.youtube.com/',
          urlShorts: 'http://localhost/RcKaOy',
          clicksNumber: 1,
          createdAt: '2024-03-30T14:53:29.500Z',
          updatedAt: '2024-03-30T14:53:29.500Z',
          deletedAt: null
        }]);
    }
  }

  return new ListShortsLinksStub();
};
const makeSut = (): SutType => {
  const listShortsLinksStub = makeListShortsLinks();
  const sut = new ListShortsLinkController(listShortsLinksStub);

  return {
    sut,
    listShortsLinksStub
  };
};

describe('List Short Links Controller', () => {
  it('should return serverError if ListShortLinks throws', async () => {
    const { sut, listShortsLinksStub } = makeSut();
    jest.spyOn(listShortsLinksStub, 'list').mockImplementationOnce(async () =>
      await Promise.reject()
    );
    const httpRequest: HttpRequest = {
      request: {
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
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
  it('should call DeleteShortLinks with correct values', async () => {
    const { sut, listShortsLinksStub } = makeSut();
    const listShortsLinksSpy = jest.spyOn(listShortsLinksStub, 'list');

    const httpRequest: HttpRequest = {
      request: {
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
      }
    };

    await sut.handle(httpRequest);
    expect(listShortsLinksSpy).toHaveBeenCalledTimes(1);
  });
  it('should return token on success', async () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      request: {
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
      }
    };

    const response = await sut.handle(httpRequest);

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toEqual([{
      clicksNumber: 1,
      createdAt: '2024-03-30T14:53:29.500Z',
      deletedAt: null,
      id: 1,
      updatedAt: '2024-03-30T14:53:29.500Z',
      url: 'https://www.youtube.com/',
      urlShorts: 'http://localhost/RcKaOy',
      userId: 'e23ad2ea-bd50-448f-a3c3-b533b72858de'
    }]);
  });
});
