import { Controller } from '../../4 - presentation/protocols/controller'
import {
  HttpRequest,
  HttpResponse
} from '../../4 - presentation/protocols/http'
import { LogControllerDecorator } from '../decorators/log'
import { LogErrorRepository } from '../../2 - data/protocols/log-error-repository'

class ControllerStub implements Controller {
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {}
    }
    return new Promise((resolve) => resolve(httpResponse))
  }
}

class LogErrorRepositoryStub implements LogErrorRepository {
  async log(stack: string): Promise<void> {
    return new Promise((resolve) => resolve())
  }
}

interface MakeFactory {
  controllerStub: ControllerStub
  logControllerDecorator: LogControllerDecorator
  logErrorRepositoryStub: LogErrorRepositoryStub
}

export const makeFactory = (): MakeFactory => {
  const controllerStub = new ControllerStub()
  const logErrorRepositoryStub = new LogErrorRepositoryStub()
  const logControllerDecorator = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  )
  return { controllerStub, logControllerDecorator, logErrorRepositoryStub }
}
