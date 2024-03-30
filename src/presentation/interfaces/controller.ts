import { HttpRequest, HttpResponse } from './controller/http';

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
