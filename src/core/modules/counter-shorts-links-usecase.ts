import { Result } from '../helpers/result';
import { IShortsLinksRepository } from '../interfaces/repositories/shorts-links-repository';
import { ICounterShortsLinkUseCase } from '../interfaces/usecases/counter-shorts-links-usecase';

export interface CounterShortsLinksConstructor {
  shortsLinksRepo: IShortsLinksRepository
}

export class CounterShortsLinksUseCase implements ICounterShortsLinkUseCase {
  private readonly shortsLinksRepo: IShortsLinksRepository;

  constructor ({ shortsLinksRepo }: CounterShortsLinksConstructor) {
    this.shortsLinksRepo = shortsLinksRepo;
  }

  async update (shortCode: string): Promise<Result<any>> {
    const shortLinksExists = await this.shortsLinksRepo.findByUrlShorts(`http://localhost/${shortCode}`);
    if (!shortLinksExists) {
      return Result.fail('URl shorts not exists');
    }
    shortLinksExists.cicksNumber++;

    await this.shortsLinksRepo.updateCounterClick(shortLinksExists);

    return Result.ok(shortLinksExists.url);
  }
}
