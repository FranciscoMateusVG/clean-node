import { badRequest } from '../../4 - presentation/helpers/http-helper'
import { makeFactory } from '../mocks/log'

describe('LogControllerDecorator', () => {
  test('Should call contoller handle', async () => {
    const { controllerStub, logControllerDecorator } = makeFactory()

    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      statusCode: 200,
      body: {
        email: 'test@example.com',
        name: 'test@example.com',
        password: 'test',
        passwordConfirmation: 'test'
      }
    }
    await logControllerDecorator.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('Should return the same result of the controlle', async () => {
    const { logControllerDecorator } = makeFactory()

    const httpRequest = {
      statusCode: 200,
      body: {
        email: 'test@example.com',
        name: 'test@example.com',
        password: 'test',
        passwordConfirmation: 'test'
      }
    }
    const httpResponse = await logControllerDecorator.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {}
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { controllerStub, logControllerDecorator, logErrorRepositoryStub } =
      makeFactory()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = badRequest(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(error)))
    const httpRequest = {
      body: {
        email: 'test@example.com',
        name: 'test@example.com',
        password: 'test',
        passwordConfirmation: 'test'
      }
    }
    await logControllerDecorator.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
