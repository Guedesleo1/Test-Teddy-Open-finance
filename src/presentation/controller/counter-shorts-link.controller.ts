import { ICounterShortsLinkUseCase } from 'src/core/interfaces/usecases/counter-shorts-links-usecase';
import { Response, Controller, HttpRequest, HttpResponse } from '..';

export class CounterShortsLinkController implements Controller {
  private readonly counterShortsLinks: ICounterShortsLinkUseCase;

  constructor (counterShortsLinks: ICounterShortsLinkUseCase) {
    this.counterShortsLinks = counterShortsLinks;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code } = httpRequest.params;

      const result = await this.counterShortsLinks.update(code);

      if (result.isFailure) {
        return Response.badRequest(result.error);
      }

      return Response.redirect(result.getValue());
    } catch (error) {
      return Response.serverError();
    }
  }
}
