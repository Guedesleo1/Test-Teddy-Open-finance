import { ICreateShortsLinksUseCase } from 'src/core/interfaces/usecases/create-shorts-links-usescase';
import { Response, Controller, HttpRequest, HttpResponse } from '..';

export class CreateShortsLinkController implements Controller {
  private readonly createShortsLinks: ICreateShortsLinksUseCase;

  constructor (createShortLinks: ICreateShortsLinksUseCase) {
    this.createShortsLinks = createShortLinks;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const bodyShrotsLinks = httpRequest.body;
      const result = await this.createShortsLinks.create(bodyShrotsLinks);

      if (result.isFailure) {
        return Response.badRequest(result.error);
      }

      return Response.ok(result.getValue());
    } catch (error) {
      console.log('error', error);
      return Response.serverError();
    }
  }
}
