import { Response, Controller, HttpRequest, HttpResponse } from '..';
import { IUpdateShortsLinkUseCase } from 'src/core/interfaces/usecases/update-shorts-links-usecase';

export class UpdateShortsLinksController implements Controller {
  private readonly updateShortLinks: IUpdateShortsLinkUseCase;

  constructor (updateShortLinks: IUpdateShortsLinkUseCase) {
    this.updateShortLinks = updateShortLinks;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code } = httpRequest.params;
      const bodyShorts = httpRequest.body;
      const { data } = httpRequest.request;

      const result = await this.updateShortLinks.update({
        code: `http://localhost/${code}`,
        userId: data.userId,
        url: bodyShorts.url
      });

      return Response.ok(result.getValue());
    } catch (error) {
      return Response.serverError();
    }
  }
}
