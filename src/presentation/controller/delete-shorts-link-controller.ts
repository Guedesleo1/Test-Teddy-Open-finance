import { Response, Controller, HttpRequest, HttpResponse } from '..';
import { IDeleteShortsLinkUseCase } from 'src/core/interfaces/usecases/delete-shorts-links-usecase';

export class DeleteShortsLinkController implements Controller {
  private readonly deleteShortsLinks: IDeleteShortsLinkUseCase;

  constructor (deleteShortsLinks: IDeleteShortsLinkUseCase) {
    this.deleteShortsLinks = deleteShortsLinks;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code } = httpRequest.params;
      const result = await this.deleteShortsLinks.delete(`http://localhost:3000/${code}`);

      return Response.ok(result.getValue());
    } catch (error) {
      return Response.serverError();
    }
  }
}
