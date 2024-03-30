import { Result } from 'src/core/helpers/result';

export interface lokenCreateDTO {
  password: string
  email: string
}

export interface IResponseCreateToken {
  accessToken: string
}

export interface ICreateTokenUseCase {
  create: (token: lokenCreateDTO) => Promise<Result<IResponseCreateToken>>
}
