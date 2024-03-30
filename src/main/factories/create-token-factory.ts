import { Bcrypt } from '@infra/adpaters/encrypter/bcrypt';
import { Auth } from '@infra/adpaters/jwt/Auth';
import { UserRepositoryTypeorm } from '@infra/database/typeorm/repositories/UserRepositoryTypeorm ';
import { CreateTokenController } from '@presentation/controller/create-token-controller';
import { CreateTokenUseCase } from 'src/core/modules/create-token-usecase';

export class CreateTokenFactory {
  static register (): CreateTokenController {
    const encrypter = new Bcrypt();
    const userRepository = new UserRepositoryTypeorm();
    const jwt = new Auth();
    const createTokenUseCase = new CreateTokenUseCase({
      userRepo: userRepository,
      encrypter,
      jwt
    });
    return new CreateTokenController(createTokenUseCase);
  }
}
