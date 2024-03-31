import { Controller, HttpRequest } from '../../../src/presentation';
import { Result } from '../../../src/core/helpers/result';
import { ICreateShortsLinksUseCase, shortsLinksDTO } from 'src/core/interfaces/usecases/create-shorts-links-usescase';
import { CreateShortsLinkController } from '../../../src/presentation/controller/create-shorts-link-controller';
import { IUpdateShortsLinkDTO, IUpdateShortsLinkUseCase } from 'src/core/interfaces/usecases/update-shorts-links-usecase';
import { UpdateShortsLinksController } from '../../../src/presentation/controller/update-shorts-links-controller';

interface SutType {
  updateShortsLinksStub: IUpdateShortsLinkUseCase
  sut: Controller
}

const makeUpdateShortsLinks = (): IUpdateShortsLinkUseCase => {
  class UpdateShortsLinksStub implements IUpdateShortsLinkUseCase {
    async update ({ code, userId, url }: IUpdateShortsLinkDTO): Promise<Result<any>> {
      return Result.ok<any>({
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
        urlShorts: 'http://localhost/FmeQNk'
      });
    }
  }

  return new UpdateShortsLinksStub();
};
const makeSut = (): SutType => {
  const updateShortsLinksStub = makeUpdateShortsLinks();
  const sut = new UpdateShortsLinksController(updateShortsLinksStub);

  return {
    sut,
    updateShortsLinksStub
  };
};

describe('Update Short Links Controller', () => {
  it('should return serverError if UpdateShortLinks throws', async () => {
    const { sut, updateShortsLinksStub } = makeSut();
    jest.spyOn(updateShortsLinksStub, 'update').mockImplementationOnce(async () =>
      await Promise.reject()
    );
    const httpRequest: HttpRequest = {
      body: {
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
      },
      params: {
        code: 'RcKaOy'
      },
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
  it('should call UpdateShortLinks with correct values', async () => {
    const { sut, updateShortsLinksStub } = makeSut();
    const updateShortsLinksSpy = jest.spyOn(updateShortsLinksStub, 'update');
    const httpRequest: HttpRequest = {
      body: {
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
      },
      params: {
        code: 'RcKaOy'
      },
      request: {
        data: {
          userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
        }
      }
    };

    await sut.handle(httpRequest);
    expect(updateShortsLinksSpy).toBeCalledWith({
      code: 'http://localhost/RcKaOy',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
      userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
    });
  });
  it('should return token on success', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      body: {
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
      },
      params: {
        code: 'RcKaOy'
      },
      request: {
        data: {
          userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
        }
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
