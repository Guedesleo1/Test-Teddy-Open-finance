import { Controller, HttpRequest } from '../../../src/presentation';
import { Result } from '../../../src/core/helpers/result';
import { ICreateShortsLinksUseCase, shortsLinksDTO } from 'src/core/interfaces/usecases/create-shorts-links-usescase';
import { CreateShortsLinkController } from '../../../src/presentation/controller/create-shorts-link-controller';
import { ICounterShortsLinkUseCase } from 'src/core/interfaces/usecases/counter-shorts-links-usecase';
import { CounterShortsLinkController } from '../../../src/presentation/controller/counter-shorts-link.controller';
import { IDeleteShortsLinkUseCase } from 'src/core/interfaces/usecases/delete-shorts-links-usecase';
import { DeleteShortsLinkController } from '../../../src/presentation/controller/delete-shorts-link-controller';

interface SutType {
  deleteShortsLinksStub: IDeleteShortsLinkUseCase
  sut: Controller
}

const makeDeleteShortsLinks = (): IDeleteShortsLinkUseCase => {
  class DeleteShortsLinksStub implements IDeleteShortsLinkUseCase {
    async delete (code: string): Promise<Result<any>> {
      return Result.ok<any>({
        id: 1
      });
    }
  }

  return new DeleteShortsLinksStub();
};
const makeSut = (): SutType => {
  const deleteShortsLinksStub = makeDeleteShortsLinks();
  const sut = new DeleteShortsLinkController(deleteShortsLinksStub);

  return {
    sut,
    deleteShortsLinksStub
  };
};

describe('Delete Short Links Controller', () => {
  it('should return serverError if DeleteShortLinks throws', async () => {
    const { sut, deleteShortsLinksStub } = makeSut();
    jest.spyOn(deleteShortsLinksStub, 'delete').mockImplementationOnce(async () =>
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
  it('should call DeleteShortLinks with correct values', async () => {
    const { sut, deleteShortsLinksStub } = makeSut();
    const deleteShortsLinksSpy = jest.spyOn(deleteShortsLinksStub, 'delete');
    const httpRequest: HttpRequest = {
      params: {
        code: 'FmeQNk'
      }
    };

    await sut.handle(httpRequest);
    expect(deleteShortsLinksSpy).toBeCalledWith(
      'http://localhost/FmeQNk'
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
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
  });
});
