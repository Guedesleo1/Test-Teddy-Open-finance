import { Result } from '../helpers/result';
import { IShortsLinksRepository } from '../interfaces/repositories/shorts-links-repository';
import { IDeleteShortsLinkUseCase } from '../interfaces/usecases/delete-shorts-links-usecase';

export interface DeleteShortsLinksConstructor {
  shortsLinksRepo: IShortsLinksRepository
}

export class DeleteShortsLinksUseCase implements IDeleteShortsLinkUseCase {
  private readonly shortsLinksRepo: IShortsLinksRepository;

  constructor ({ shortsLinksRepo }: DeleteShortsLinksConstructor) {
    this.shortsLinksRepo = shortsLinksRepo;
  }

  async delete (code: string): Promise<Result<any>> {
    const shortLinksExists = await this.shortsLinksRepo.findByUrlShorts(code);
    if (!shortLinksExists) {
      return Result.fail('URL shorts not exists.');
    }
    await this.shortsLinksRepo.delete(shortLinksExists.id);
    return Result.ok({ id: shortLinksExists.id });
  }
}
