import { IShortsLinks } from '@infra/database/typeorm/entities/shorts-links-entity';

export interface IReponseShortsLinks {
  userId?: string | null
  url: string
  urlShorts: string
  clickQuantity: number
}

export interface IShortsLinksRepository {
  create: (shortLinks: IShortsLinks) => Promise<IReponseShortsLinks>
  exists: ({ url }: { url: string }) => Promise<boolean>
  findByUrlShorts: (urlShorts: string) => Promise<any>
  updateCounterClick: (shortLinks: any) => Promise<void>
  list: () => Promise<IShortsLinks[]>
}
