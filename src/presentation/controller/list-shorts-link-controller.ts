import { IListShortsLinkUseCase } from 'src/core/interfaces/usecases/list-shorts-links-usecase';
import { Response, Controller, HttpRequest, HttpResponse } from '..';

export class ListShortsLinkController implements Controller {
  private readonly listShortsLinks: IListShortsLinkUseCase;

  constructor (listShortsLinks: IListShortsLinkUseCase) {
    this.listShortsLinks = listShortsLinks;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.listShortsLinks.list();

      return Response.ok(result.getValue());
    } catch (error) {
      return Response.serverError();
    }
  }
}
