import { Controller, HttpRequest, HttpResponse } from '@presentation/index';
import { Request, Response } from 'express';

export class ExpressRouteAdapter {
  static adapt (controller: Controller): any {
    return async (request: Request, response: Response) => {
      const httpRequest: HttpRequest = {
        body: request.body,
        request,
        params: request.params
      };
      const httpResponse: HttpResponse = await controller.handle(
        httpRequest
      );
      if (httpResponse.statusCode === 301) {
        return response.redirect(httpResponse.headers.url);
      }

      return response
        .status(httpResponse.statusCode)
        .json(httpResponse.body);
    };
  }
}
