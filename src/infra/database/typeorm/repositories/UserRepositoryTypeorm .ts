import 'reflect-metadata';
import { Repository } from 'typeorm';
import { dateBaseSource } from '../data-source';
import { IUserRepository } from 'src/core/interfaces/repositories/users-repository';
import { UsersEntity } from '../entities/users.entity';
import { UsersDomain } from '@entities/users-domain';
import { IReponseUsers } from 'src/core/interfaces/usecases/Icreate-users-usecase';

export class UserRepositoryTypeorm implements IUserRepository {
  private readonly userEntity: Repository<UsersDomain>;
  constructor () {
    this.userEntity = dateBaseSource.getRepository<UsersDomain>(UsersEntity);
  }

  async create (user: UsersDomain): Promise<IReponseUsers> {
    const userCreate = this.userEntity.create(user);
    await this.userEntity.save(userCreate);
    return {
      userId: userCreate.userId,
      email: userCreate.email,
      name: userCreate.name,
      password: userCreate.password
    };
  }

  async exists ({ email }: { email: string }): Promise<boolean> {
    const userExists = await this.userEntity.findOne({ where: { email } });
    return !!userExists;
  }
}
