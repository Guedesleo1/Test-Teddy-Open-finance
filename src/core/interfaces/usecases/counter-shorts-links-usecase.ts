import { Result } from 'src/core/helpers/result';

export interface ICounterShortsLinkUseCase {
  update: (code: string) => Promise<Result<any>>
}
