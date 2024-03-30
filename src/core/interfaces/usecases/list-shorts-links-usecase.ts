import { Result } from 'src/core/helpers/result';

export interface IListShortsLinkUseCase {
  list: () => Promise<Result<any>>
}
