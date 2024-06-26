import 'reflect-metadata';
import { IsNull, Repository } from 'typeorm';
import { dateBaseSource } from '../data-source';
import { IShortsLinks, ShortsLinksEntity } from '../entities/shorts-links-entity';
import { IReponseShortsLinks, IShortsLinksRepository } from 'src/core/interfaces/repositories/shorts-links-repository';
import { IUpdateShortsLinkRepositoryDTO } from 'src/core/interfaces/usecases/update-shorts-links-usecase';

export class ShortsLinksRepositoryTypeorm implements IShortsLinksRepository {
  private readonly shortLinksEntity: Repository<IShortsLinks>;
  constructor () {
    this.shortLinksEntity = dateBaseSource.getRepository<IShortsLinks>(ShortsLinksEntity);
  }

  async create (shortLinks: IShortsLinks): Promise<IReponseShortsLinks> {
    const shortLinksCreate = this.shortLinksEntity.create(shortLinks);
    await this.shortLinksEntity.save(shortLinksCreate);
    return {
      userId: shortLinksCreate.userId ?? null,
      url: shortLinksCreate.url,
      urlShorts: shortLinksCreate.urlShorts
    };
  }

  async exists ({ url }: { url: string }): Promise<boolean> {
    const shortLinksExists = await this.shortLinksEntity.findOne({ where: { url } });
    return !!shortLinksExists;
  }

  async findByUrlShorts (urlShorts: string): Promise<IShortsLinks | null> {
    const urlShortsExists = await this.shortLinksEntity.findOne({ where: { urlShorts, deletedAt: IsNull() } });
    return urlShortsExists;
  }

  async updateCounterClick (shortLinks: any): Promise<void> {
    await this.shortLinksEntity.save(shortLinks);
  }

  async list (): Promise<IShortsLinks[]> {
    return await this.shortLinksEntity.find({
      where: {
        deletedAt: IsNull()
      }
    });
  }

  async delete (id: number): Promise<void> {
    await this.shortLinksEntity.update(id, {
      deletedAt: new Date()
    });
  }

  async update ({ id, userId, url }: IUpdateShortsLinkRepositoryDTO): Promise<any> {
    await this.shortLinksEntity.update(id, {
      userId,
      url
    });

    const updatedShortsLink = await this.shortLinksEntity.findOne({
      where: {
        url
      }
    });

    return updatedShortsLink;
  }
}
