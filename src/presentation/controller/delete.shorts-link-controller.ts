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
      const { data } = httpRequest.request;
      const result = await this.deleteShortsLinks.delete(`http://localhost/${code}`, data.userId);

      return Response.ok(result.getValue());
    } catch (error) {
      console.log('error', error);
      return Response.serverError();
    }
  }
}
