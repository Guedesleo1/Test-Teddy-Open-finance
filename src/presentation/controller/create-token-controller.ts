import { ICreateTokenUseCase } from 'src/core/interfaces/usecases/crate-token-usecase';
import { Response, Controller, HttpRequest, HttpResponse } from '..';

export class CreateTokenController implements Controller {
  private readonly createToken: ICreateTokenUseCase;

  constructor (createToken: ICreateTokenUseCase) {
    this.createToken = createToken;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const dataToken = httpRequest.body;

      const result = await this.createToken.create(dataToken);

      if (result.isFailure) {
        return Response.badRequest(result.error);
      }

      return Response.ok(result.getValue());
    } catch (error) {
      return Response.serverError();
    }
  }
}
