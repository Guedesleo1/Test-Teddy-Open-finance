import { UsersDomain } from '@entities/users-domain';
import { IdGenerator } from '../../../src/core/interfaces/adapters/id-generator';
import { IReponseShortsLinks, IShortsLinksRepository } from '../../../src/core/interfaces/repositories/shorts-links-repository';
import { ICreateShortsLinksUseCase } from '../../../src/core/interfaces/usecases/create-shorts-links-usescase';
import { CreateShortsLinksUseCase } from '../../../src/core/modules/create-shorts-links-usecase';
import { IShortId } from '../../../src/core/interfaces/adapters/short-id';
import { IShortsLinks } from '@infra/database/typeorm/entities/shorts-links-entity';
import { IUpdateShortsLinkRepositoryDTO } from '../../../src/core/interfaces/usecases/update-shorts-links-usecase';

interface SutType {
  shortIdStub: IShortId
  shortsLinksRepositoryStub: IShortsLinksRepository
  sut: ICreateShortsLinksUseCase
}
const makeShortId = (): IShortId => {
  class ShortIdStub implements IShortId {
    generate () {
      return 'A4d3EB';
    }
  }
  return new ShortIdStub();
};

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
  const shortIdStub = makeShortId();
  const shortsLinksRepositoryStub = makeShortsLinksRepository();

  const sut = new CreateShortsLinksUseCase({
    shortsLinksRepo: shortsLinksRepositoryStub,
    shortId: shortIdStub
  });

  return {
    sut,
    shortIdStub,
    shortsLinksRepositoryStub
  };
};

describe('Create Shrots Links UseCase', () => {
  it('Should be shortId.random to be called with correct params', async () => {
    const { shortIdStub, sut } = makeSut();

    const shortIdSpy = jest.spyOn(shortIdStub, 'generate');

    await sut.create({
      userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
    });

    expect(shortIdSpy).toHaveBeenCalledTimes(1);
  });

  it('Should be shortsLinksRepositoryStub.exists to be called with correct params', async () => {
    const { shortsLinksRepositoryStub, sut } = makeSut();

    const shortsLinksRepositorySpy = jest.spyOn(shortsLinksRepositoryStub, 'exists');

    await sut.create({
      userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
    });

    expect(shortsLinksRepositorySpy).toHaveBeenCalledTimes(1);
    expect(shortsLinksRepositorySpy).toHaveBeenCalledWith({ url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/' });
  });

  it('Should be shortsLinksRepositoryStub.exists, urlShrots exists', async () => {
    const { shortsLinksRepositoryStub, sut } = makeSut();

    jest.spyOn(shortsLinksRepositoryStub, 'exists').mockImplementationOnce(async () => {
      return await Promise.resolve(true);
    });

    const response = await sut.create({
      userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
    });

    expect(response.isSuccess).toBeFalsy();
    expect(response.isFailure).toBeTruthy();
    expect(response.error).toEqual('URL already exists.');
  });
  it('Should be shortsLinksRepositoryStub.create to be called with correct params', async () => {
    const { shortsLinksRepositoryStub, sut } = makeSut();

    const shortsLinksRepositorySpy = jest.spyOn(shortsLinksRepositoryStub, 'create');

    const result = await sut.create({
      userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/'
    });

    expect(shortsLinksRepositorySpy).toHaveBeenCalledTimes(1);
    expect(shortsLinksRepositorySpy).toHaveBeenCalledWith({
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
      urlShorts: 'http://localhost/A4d3EB',
      userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef'
    });
    expect(result.getValue()).toEqual({
      userId: 'ca549f8d-1374-40da-9800-a4aa68f72cef',
      url: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
      urlShorts: 'http://localhost/RcKaOy'
    });
  });
});
