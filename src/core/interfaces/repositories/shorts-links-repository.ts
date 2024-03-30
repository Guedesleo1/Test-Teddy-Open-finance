import { IShortsLinks } from '@infra/database/typeorm/entities/shorts-links-entity';
import { IUpdateShortsLinkRepositoryDTO } from '../usecases/update-shorts-links-usecase';

export interface IReponseShortsLinks {
  userId?: string | null
  url: string
  urlShorts: string
}

export interface IShortsLinksRepository {
  create: (shortLinks: IShortsLinks) => Promise<IReponseShortsLinks>
  exists: ({ url }: { url: string }) => Promise<boolean>
  findByUrlShorts: (urlShorts: string) => Promise<any>
  updateCounterClick: (shortLinks: any) => Promise<void>
  list: () => Promise<IShortsLinks[]>
  delete: (id: number) => Promise<void>
  update: ({ id, userId, url }: IUpdateShortsLinkRepositoryDTO) => Promise<any>
}
