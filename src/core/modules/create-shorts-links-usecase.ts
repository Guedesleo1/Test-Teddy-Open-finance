import { Result } from '../helpers/result';
import { IShortId } from '../interfaces/adapters/short-id';
import { IShortsLinksRepository } from '../interfaces/repositories/shorts-links-repository';
import { ICreateShortsLinksUseCase, shortsLinksDTO } from '../interfaces/usecases/create-shorts-links-usescase';

export interface CreateShortsLinksConstructor {
  shortsLinksRepo: IShortsLinksRepository
  shortId: IShortId
}

export class CreateShortsLinksUseCase implements ICreateShortsLinksUseCase {
  private readonly shortsLinksRepo: IShortsLinksRepository;
  private readonly shortId: IShortId;

  constructor ({ shortsLinksRepo, shortId }: CreateShortsLinksConstructor) {
    this.shortsLinksRepo = shortsLinksRepo;
    this.shortId = shortId;
  }

  async create (shortsLikns: shortsLinksDTO): Promise<Result<any>> {
    const userExists = await this.shortsLinksRepo.exists({
      url: shortsLikns.url
    });
    if (userExists) {
      return Result.fail('Url already exists');
    }

    const newShortsLinks = await this.shortsLinksRepo.create({
      userId: 'e23ad2ea-bd50-448f-a3c3-b533b72858de',
      url: shortsLikns.url,
      urlShorts: `http://localhost/${this.shortId.generate()}`
    });

    return Result.ok(newShortsLinks);
  }
}
