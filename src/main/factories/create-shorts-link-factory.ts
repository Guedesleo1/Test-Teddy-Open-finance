import { ShortId } from '@infra/adpaters/short-id/short-id';
import { ShortsLinksRepositoryTypeorm } from '@infra/database/typeorm/repositories/ShortsLinksRepositoryTypeorm';
import { CreateShortsLinkController } from '@presentation/controller/create-shorts-link-controller';
import { CreateShortsLinksUseCase } from 'src/core/modules/create-shorts-links-usecase';

export class CreateShortsLinkFactory {
  static register (): CreateShortsLinkController {
    const shortId = new ShortId();
    const shortsLinksRepository = new ShortsLinksRepositoryTypeorm();
    const createShortsLinksUseCase = new CreateShortsLinksUseCase({
      shortsLinksRepo: shortsLinksRepository,
      shortId
    });

    return new CreateShortsLinkController(createShortsLinksUseCase);
  }
}
