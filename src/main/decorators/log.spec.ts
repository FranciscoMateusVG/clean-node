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
})
