import { Result } from 'src/core/helpers/result';

export interface IUpdateShortsLinkDTO {
  code: string
  userId: string
  url: string
}

export interface IUpdateShortsLinkRepositoryDTO {
  id: number
  userId: string
  url: string
}

export interface IUpdateShortsLinkUseCase {
  update: ({ code, userId, url }: IUpdateShortsLinkDTO) => Promise<Result<any>>
}
