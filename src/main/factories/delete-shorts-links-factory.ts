import { ShortsLinksRepositoryTypeorm } from '@infra/database/typeorm/repositories/ShortsLinksRepositoryTypeorm';
import { DeleteShortsLinkController } from '@presentation/controller/delete-shorts-link-controller';
import { DeleteShortsLinksUseCase } from 'src/core/modules/delete-shorts-links-usecase';

export class DeleteShortsLinkFactory {
  static register (): DeleteShortsLinkController {
    const shortsLinksRepository = new ShortsLinksRepositoryTypeorm();
    const deleteShortsLinksUseCase = new DeleteShortsLinksUseCase({
      shortsLinksRepo: shortsLinksRepository
    });
    return new DeleteShortsLinkController(deleteShortsLinksUseCase);
  }
}
