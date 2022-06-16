import { InvalidParamsError } from '../errors/invalid-params'
import { MissingParamsError } from '../errors/missing-params'
import { makeSignUpController } from '../mocks/make-signUpController'
import { HttpResponse } from '../protocols/http'

describe('SignUp Controller errors', () => {
  test('Should return 400 if no name is provided', async () => {
    const body = {
      email: 'email',
      password: 'pass',
      passwordConfirmation: 'pass'
    }

    const { signUpController, httpRequest } = makeSignUpController(body)

    const action = async (): Promise<HttpResponse> => {
      return await signUpController.handle(httpRequest)
    }

    await expect(action()).resolves.toEqual({
      body: new MissingParamsError(['name']),
      statusCode: 400
    })
  })

  test('Should return 400 if no email is provided', async () => {
    const body = {
      name: 'name',
      password: 'pass',
      passwordConfirmation: 'pass'
    }
    const { signUpController, httpRequest } = makeSignUpController(body)

    const action = async (): Promise<HttpResponse> => {
      return await signUpController.handle(httpRequest)
    }

    await expect(action()).resolves.toEqual({
      body: new MissingParamsError(['email']),
      statusCode: 400
    })
  })

  test('Should return 400 if no password is provided', async () => {
    const body = {
      name: 'name',
      email: 'email',
      passwordConfirmation: 'pass'
    }
    const { signUpController, httpRequest } = makeSignUpController(body)

    const httpResponse = await signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError(['password']))
  })

  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const body = {
      name: 'name',
      email: 'email',
      password: 'pass'
    }
    const { signUpController, httpRequest } = makeSignUpController(body)

    const httpResponse = await signUpController.handle(httpRequest)

    await expect(httpResponse.statusCode).toBe(400)
    await expect(httpResponse.body).toEqual(
      new MissingParamsError(['passwordConfirmation'])
    )
  })

  test('Should return 400 if no X parameters is provided', async () => {
    const body = {
      name: 'name',
      password: 'pass'
    }
    const { signUpController, httpRequest } = makeSignUpController(body)

    const httpResponse = await signUpController.handle(httpRequest)

    await expect(httpResponse.statusCode).toBe(400)
    await expect(httpResponse.body).toEqual(
      new MissingParamsError(['email', 'passwordConfirmation'])
    )
  })

  test('Should return 400 if invalid email', async () => {
    const body = {
      name: 'name',
      email: 'invalid',
      password: 'pass',
      passwordConfirmation: 'pass'
    }
    const { signUpController, httpRequest } = makeSignUpController(body)

    const httpResponse = await signUpController.handle(httpRequest)

    await expect(httpResponse.statusCode).toBe(400)
    await expect(httpResponse.body).toEqual(new InvalidParamsError('email'))
  })

  test('Should return 400 if password is diferent from confirmationPassword', async () => {
    const body = {
      name: 'name',
      email: 'email',
      password: 'pass',
      passwordConfirmation: 'passDiff'
    }
    const { signUpController, httpRequest } = makeSignUpController(body)

    const httpResponse = await signUpController.handle(httpRequest)

    await expect(httpResponse.statusCode).toBe(400)
    await expect(httpResponse.body).toEqual(
      new InvalidParamsError('confirmationPassword')
    )
  })
})

describe('SignUp correct integration with addAccount', () => {
  test('calls with correct values', async () => {
    const { signUpController, httpRequest, addAccountStub } =
      makeSignUpController()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await signUpController.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'name',
      email: 'email',
      password: 'pass'
    })
  })
  test('return 200 if valid data is provided', async () => {
    const { signUpController, httpRequest, addAccountStub } =
      makeSignUpController()

    const httpResponse = await signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ id: 1 })
  })
})
