import 'reflect-metadata';
import { Repository } from 'typeorm';
import { dateBaseSource } from '../data-source';
import { IShortsLinks, ShortsLinksEntity } from '../entities/shorts-links-entity';
import { IShortsLinksRepository } from 'src/core/interfaces/repositories/shorts-links-repository';

export class ShortsLinksRepositoryTypeorm implements IShortsLinksRepository {
  private readonly shortLinksEntity: Repository<IShortsLinks>;
  constructor () {
    this.shortLinksEntity = dateBaseSource.getRepository<IShortsLinks>(ShortsLinksEntity);
  }

  async create (shortLinks: IShortsLinks): Promise<any> {
    const shortLinksCreate = this.shortLinksEntity.create(shortLinks);
    await this.shortLinksEntity.save(shortLinksCreate);
    return shortLinksCreate;
  }

  async exists ({ url }: { url: string }): Promise<boolean> {
    const shortLinksExists = await this.shortLinksEntity.findOne({ where: { url } });
    return !!shortLinksExists;
  }
}
