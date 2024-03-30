import { ICreateUserUseCase } from 'src/core/interfaces/usecases/create-users-usecase';
import { Response, Controller, HttpRequest, HttpResponse } from '..';

export class CreateUsersController implements Controller {
  private readonly createUser: ICreateUserUseCase;

  constructor (createUser: ICreateUserUseCase) {
    this.createUser = createUser;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const bodyUser = httpRequest.body;
      const result = await this.createUser.create(bodyUser);

      if (result.isFailure) {
        return Response.badRequest(result.error);
      }

      return Response.ok(result);
    } catch (error) {
      console.log('error', error);
      return Response.serverError();
    }
  }
}
