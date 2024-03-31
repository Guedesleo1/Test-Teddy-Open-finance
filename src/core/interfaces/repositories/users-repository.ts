import { UsersDomain } from '@entities/users-domain';

export interface IUserRepository {
  create: (user: any) => Promise<any>
  exists: ({ email }: { email: string }) => Promise<boolean>
  findByEmail: (email: string) => Promise<UsersDomain | null>
}
