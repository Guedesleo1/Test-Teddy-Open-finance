import { ShortsLinksRepositoryTypeorm } from '@infra/database/typeorm/repositories/ShortsLinksRepositoryTypeorm';
import { ListShortsLinkController } from '@presentation/controller/list-shorts-link-controller';
import { ListShortsLinksUseCase } from 'src/core/modules/list-shorts-links-usecase';

export class ListShortsLinkFactory {
  static register (): ListShortsLinkController {
    const shortsLinksRepository = new ShortsLinksRepositoryTypeorm();
    const listShortsLinksUseCase = new ListShortsLinksUseCase({
      shortsLinksRepo: shortsLinksRepository
    });
    return new ListShortsLinkController(listShortsLinksUseCase);
  }
}
