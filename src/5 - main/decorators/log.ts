import { DefaultBody } from '../../4 - presentation/mocks/make-signUpController'
import { Controller } from '../../4 - presentation/protocols/controller'
import {
  HttpRequest,
  HttpResponse
} from '../../4 - presentation/protocols/http'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  async handle(httpRequest: HttpRequest<DefaultBody>): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
    }
    return httpResponse
  }
}
