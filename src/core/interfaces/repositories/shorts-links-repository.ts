import { IShortsLinks } from '@infra/database/typeorm/entities/shorts-links-entity';

export interface IShortsLinksRepository {
  create: (shortLinks: IShortsLinks) => Promise<any>
  exists: ({ url }: { url: string }) => Promise<boolean>
}
