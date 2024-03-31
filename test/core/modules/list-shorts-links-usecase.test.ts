import { IReponseShortsLinks, IShortsLinksRepository } from '../../../src/core/interfaces/repositories/shorts-links-repository';
import { IShortsLinks } from '@infra/database/typeorm/entities/shorts-links-entity';
import { IUpdateShortsLinkRepositoryDTO } from '../../../src/core/interfaces/usecases/update-shorts-links-usecase';
import { CounterShortsLinksUseCase } from '../../../src/core/modules/counter-shorts-links-usecase';
import { ICounterShortsLinkUseCase } from '../../../src/core/interfaces/usecases/counter-shorts-links-usecase';
import { IDeleteShortsLinkUseCase } from '../../../src/core/interfaces/usecases/delete-shorts-links-usecase';
import { DeleteShortsLinksUseCase } from '../../../src/core/modules/delete-shorts-links-usecase';
import { IListShortsLinkUseCase } from '../../../src/core/interfaces/usecases/list-shorts-links-usecase';
import { ListShortsLinksUseCase } from '../../../src/core/modules/list-shorts-links-usecase';

interface SutType {
  shortsLinksRepositoryStub: IShortsLinksRepository
  sut: IListShortsLinkUseCase
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

  const sut = new ListShortsLinksUseCase({
    shortsLinksRepo: shortsLinksRepositoryStub
  });

  return {
    sut,
    shortsLinksRepositoryStub
  };
};

describe('List Shrots Links UseCase', () => {
  it('Should be shortsLinksRepositoryStub.list to be called with correct params', async () => {
    const { shortsLinksRepositoryStub, sut } = makeSut();
    const shortsLinksRepositorySpy = jest.spyOn(shortsLinksRepositoryStub, 'list');

    const result = await sut.list();

    expect(shortsLinksRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
