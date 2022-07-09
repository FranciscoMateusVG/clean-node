import { LogErrorRepository } from '../../2 - data/protocols/log-error-repository'
import { DefaultBody } from '../../4 - presentation/mocks/make-signUpController'
import { Controller } from '../../4 - presentation/protocols/controller'
import {
  HttpRequest,
  HttpResponse
} from '../../4 - presentation/protocols/http'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository

  constructor(controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle(httpRequest: HttpRequest<DefaultBody>): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode > 300) {
      await this.logErrorRepository.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
