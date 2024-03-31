import { Result } from 'src/core/helpers/result';

export interface IDeleteShortsLinkUseCase {
  delete: (code: string) => Promise<Result<any>>
}
