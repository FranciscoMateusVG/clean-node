import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'
import { LogControllerDecorator } from '../decorators/log'

class ControllerStub implements Controller {
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {}
    }
    return new Promise((resolve) => resolve(httpResponse))
  }
}

interface MakeFactory {
  controllerStub: ControllerStub
  logControllerDecorator: LogControllerDecorator
}

export const makeFactory = (): MakeFactory => {
  const controllerStub = new ControllerStub()
  const logControllerDecorator = new LogControllerDecorator(controllerStub)
  return { controllerStub, logControllerDecorator }
}
