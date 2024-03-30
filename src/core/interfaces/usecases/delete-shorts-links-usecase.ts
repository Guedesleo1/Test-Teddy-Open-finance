import { Result } from 'src/core/helpers/result';

export interface IDeleteShortsLinkUseCase {
  delete: (code: string, userId: string) => Promise<Result<any>>
}
