import { Result } from 'src/core/helpers/result';

export interface shortsLinksDTO {
  url: string
}

export interface ICreateShortsLinksUseCase {
  create: (url: shortsLinksDTO) => Promise<Result<any>>
}
