import { ShortsLinksRepositoryTypeorm } from '@infra/database/typeorm/repositories/ShortsLinksRepositoryTypeorm';
import { CounterShortsLinkController } from '@presentation/controller/counter-shorts-link.controller';
import { CounterShortsLinksUseCase } from 'src/core/modules/counter-shorts-links-usecase';

export class CounterShortsLinkFactory {
  static register (): CounterShortsLinkController {
    const shortsLinksRepository = new ShortsLinksRepositoryTypeorm();
    const counterShortsLinksUseCase = new CounterShortsLinksUseCase({
      shortsLinksRepo: shortsLinksRepository
    });
    return new CounterShortsLinkController(counterShortsLinksUseCase);
  }
}
