import { Result } from '../../helpers/result';

export interface usersCreateDTO {
  name: string
  email: string
  password: string
}

export interface IReponseUsers {
  userId?: string
  name: string
  email: string
  password: string
}

export interface ICreateUserUseCase {
  create: (user: usersCreateDTO) => Promise<Result<any>>
}
