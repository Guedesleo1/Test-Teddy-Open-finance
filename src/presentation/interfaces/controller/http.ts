interface HttpRequest {
  body?: any
  request?: any
  params?: any
}

interface HttpResponse {
  statusCode: number
  body?: any
  headers?: any
}

export type { HttpRequest, HttpResponse };
