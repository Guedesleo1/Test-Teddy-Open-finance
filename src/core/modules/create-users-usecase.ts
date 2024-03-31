import { Result } from '../helpers/result';
import { Encrypter } from '../interfaces/adapters/encrypter';
import { IdGenerator } from '../interfaces/adapters/id-generator';
import { IUserRepository } from '../interfaces/repositories/users-repository';
import { ICreateUserUseCase, usersCreateDTO } from '../interfaces/usecases/create-users-usecase';

interface CreateUserConstructor {
  userRepo: IUserRepository
  encrypter: Encrypter
  idGenerator: IdGenerator
}

export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly userRepo: IUserRepository;
  private readonly idGenerator: IdGenerator;
  private readonly encrypter: Encrypter;

  constructor ({ userRepo, encrypter, idGenerator }: CreateUserConstructor) {
    this.userRepo = userRepo;
    this.encrypter = encrypter;
    this.idGenerator = idGenerator;
  }

  async create (users: usersCreateDTO): Promise<Result<any>> {
    const userExists = await this.userRepo.exists({
      email: users.email.toUpperCase()
    });
    if (userExists) {
      return Result.fail('User already exists');
    }

    const newUser = await this.userRepo.create({
      userId: this.idGenerator.random(),
      email: users.email,
      name: users.name,
      password: await this.encrypter.hash(users.password)
    });

    return Result.ok<any>(newUser);
  }
}
