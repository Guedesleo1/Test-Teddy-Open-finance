export interface IUserRepository {
  create: (user: any) => Promise<any>
  exists: ({ email }: { email: string }) => Promise<boolean>
}
