import { Result } from '../helpers/result';
import { IShortsLinksRepository } from '../interfaces/repositories/shorts-links-repository';
import { IUpdateShortsLinkDTO, IUpdateShortsLinkUseCase } from '../interfaces/usecases/update-shorts-links-usecase';

export interface UpdateShortsLinksConstructor {
  shortsLinksRepo: IShortsLinksRepository
}

export class UpdateShortsLinksUseCase implements IUpdateShortsLinkUseCase {
  private readonly shortsLinksRepo: IShortsLinksRepository;

  constructor ({ shortsLinksRepo }: UpdateShortsLinksConstructor) {
    this.shortsLinksRepo = shortsLinksRepo;
  }

  async update ({ code, userId, url }: IUpdateShortsLinkDTO): Promise<Result<any>> {
    const shortLinksExists = await this.shortsLinksRepo.findByUrlShorts(code);
    if (!shortLinksExists) {
      return Result.fail('URL shorts not exists.');
    }
    const reusltShortsLink = await this.shortsLinksRepo.update({
      id: shortLinksExists.id,
      url,
      userId
    });
    return Result.ok(reusltShortsLink);
  }
}
