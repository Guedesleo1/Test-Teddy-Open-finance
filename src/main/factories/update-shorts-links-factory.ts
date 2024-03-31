import { ShortsLinksRepositoryTypeorm } from '@infra/database/typeorm/repositories/ShortsLinksRepositoryTypeorm';
import { UpdateShortsLinksController } from '@presentation/controller/update-shorts-links-controller';
import { UpdateShortsLinksUseCase } from 'src/core/modules/update-shorts-links-usecase';

export class UpdateShortsLinkFactory {
  static register (): UpdateShortsLinksController {
    const shortsLinksRepository = new ShortsLinksRepositoryTypeorm();
    const updateShortsLinksUseCase = new UpdateShortsLinksUseCase({
      shortsLinksRepo: shortsLinksRepository
    });
    return new UpdateShortsLinksController(updateShortsLinksUseCase);
  }
}
