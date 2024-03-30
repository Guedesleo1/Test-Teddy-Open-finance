import { Bcrypt } from '@infra/adpaters/encrypter/bcrypt';
import { Uuid } from '@infra/adpaters/id-generator/uuid';
import { UserRepositoryTypeorm } from '@infra/database/typeorm/repositories/UserRepositoryTypeorm ';
import { CreateUsersController } from '@presentation/controller/create-users-controller';
import { CreateUserUseCase } from 'src/core/modules/create-users-usecase';

export class CreateUsersFactory {
  static register (): CreateUsersController {
    const idGenerator = new Uuid();
    const encrypter = new Bcrypt();
    const userRepository = new UserRepositoryTypeorm();
    const createUserUseCase = new CreateUserUseCase({
      userRepo: userRepository,
      encrypter,
      idGenerator
    });
    return new CreateUsersController(createUserUseCase);
  }
}
