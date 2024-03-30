import { Result } from '../helpers/result';
import { IShortsLinksRepository } from '../interfaces/repositories/shorts-links-repository';
import { IListShortsLinkUseCase } from '../interfaces/usecases/list-shorts-links-usecase';

export interface ListShortsLinksConstructor {
  shortsLinksRepo: IShortsLinksRepository
}

export class ListShortsLinksUseCase implements IListShortsLinkUseCase {
  private readonly shortsLinksRepo: IShortsLinksRepository;

  constructor ({ shortsLinksRepo }: ListShortsLinksConstructor) {
    this.shortsLinksRepo = shortsLinksRepo;
  }

  async list (): Promise<Result<any>> {
    const result = await this.shortsLinksRepo.list();
    return Result.ok(result);
  }
}
