import { IReponseShortsLinks, IShortsLinksRepository } from '../../../src/core/interfaces/repositories/shorts-links-repository';
import { IShortsLinks } from '@infra/database/typeorm/entities/shorts-links-entity';
import { IUpdateShortsLinkRepositoryDTO, IUpdateShortsLinkUseCase } from '../../../src/core/interfaces/usecases/update-shorts-links-usecase';
import { IDeleteShortsLinkUseCase } from '../../../src/core/interfaces/usecases/delete-shorts-links-usecase';
import { DeleteShortsLinksUseCase } from '../../../src/core/modules/delete-shorts-links-usecase';
import { UpdateShortsLinksUseCase } from '../../../src/core/modules/update-shorts-links-usecase';

interface SutType {
  shortsLinksRepositoryStub: IShortsLinksRepository
  sut: IUpdateShortsLinkUseCase
}

const makeShortsLinksRepository = (): IShortsLinksRepository => {
  class UsersRepositoryStub implements IShortsLinksRepository {
    async create (shortLinks: IShortsLinks): Promise<IReponseShortsLinks> {
      return await Promise.resolve({
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
        urlShorts: 'http://localhost/RcKaOy'
      });
    }

    async exists ({ url }: { url: string }): Promise<boolean> {
      return await new Promise((resolve) => resolve(false));
    }

    async list (): Promise<IShortsLinks[]> {
      return await Promise.resolve([
        {
          id: 1,
          userId: 'e23ad2ea-bd50-448f-a3c3-b533b72858de',
          url: 'https://www.youtube.com/',
          urlShorts: 'http://localhost/RcKaOy',
          clicksNumber: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }]
      );
    }

    async findByUrlShorts (urlShorts: string): Promise<any> {
      return await Promise.resolve({
        id: 1,
        userId: 'e23ad2ea-bd50-448f-a3c3-b533b72858de',
        url: 'https://www.youtube.com/',
        urlShorts: 'http://localhost/RcKaOy',
        clicksNumber: 0,
        createdAt: '2024-03-30T14:53:29.500Z',
        updatedAt: '2024-03-30T14:53:29.500Z',
        deletedAt: null
      });
    }

    async updateCounterClick (shortLinks: any): Promise<void> {

    }

    async delete (id: number): Promise<void> {

    }

    async update ({ id, userId, url }: IUpdateShortsLinkRepositoryDTO): Promise<any> {
      return await Promise.resolve({
        userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
        url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
        urlShorts: 'http://localhost/FmeQNk'
      });
    }
  }
  return new UsersRepositoryStub();
};

const makeSut = (): SutType => {
  const shortsLinksRepositoryStub = makeShortsLinksRepository();

  const sut = new UpdateShortsLinksUseCase({
    shortsLinksRepo: shortsLinksRepositoryStub
  });

  return {
    sut,
    shortsLinksRepositoryStub
  };
};

describe('Update Shrots Links UseCase', () => {
  it('Should be shortsLinksRepositoryStub.findByUrlShorts to be called with correct params', async () => {
    const { shortsLinksRepositoryStub, sut } = makeSut();

    const shortsLinksRepositorySpy = jest.spyOn(shortsLinksRepositoryStub, 'findByUrlShorts');

    await sut.update({
      code: 'A4d3EB',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
      userId: 'e23ad2ea-bd50-448f-a3c3-b533b72858de'
    });

    expect(shortsLinksRepositorySpy).toHaveBeenCalledTimes(1);
    expect(shortsLinksRepositorySpy).toHaveBeenCalledWith('A4d3EB');
  });
  it('Should be shortsLinksRepositoryStub.findByUrlShorts, urlShrots not exists', async () => {
    const { shortsLinksRepositoryStub, sut } = makeSut();

    jest.spyOn(shortsLinksRepositoryStub, 'findByUrlShorts').mockImplementationOnce(async () => {
      return await Promise.resolve(false);
    });

    const response = await sut.update({
      code: 'A4d3EB',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
      userId: 'e23ad2ea-bd50-448f-a3c3-b533b72858de'
    });
    expect(response.isSuccess).toBeFalsy();
    expect(response.isFailure).toBeTruthy();
    expect(response.error).toEqual('URL shorts not exists.');
  });
  it('Should be shortsLinksRepositoryStub.update to be called with correct params', async () => {
    const { shortsLinksRepositoryStub, sut } = makeSut();

    jest.spyOn(shortsLinksRepositoryStub, 'findByUrlShorts').mockImplementationOnce(async () => {
      return await Promise.resolve({
        id: 1,
        userId: 'e23ad2ea-bd50-448f-a3c3-b533b72858de',
        url: 'https://www.youtube.com/',
        urlShorts: 'http://localhost/A4d3EB',
        clicksNumber: 0,
        createdAt: '2024-03-30T14:53:29.500Z',
        updatedAt: '2024-03-30T14:53:29.500Z',
        deletedAt: null
      });
    });

    const shortsLinksRepositorySpy = jest.spyOn(shortsLinksRepositoryStub, 'update');

    const result = await sut.update({
      code: 'A4d3EB',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
      userId: 'e23ad2ea-bd50-448f-a3c3-b533b72858de'
    });

    expect(shortsLinksRepositorySpy).toHaveBeenCalledTimes(1);
    expect(result.getValue()).toEqual({
      userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
      urlShorts: 'http://localhost/FmeQNk'
    });
  });
});
