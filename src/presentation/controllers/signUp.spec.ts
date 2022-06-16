import { InvalidParamsError } from '../errors/invalid-params'
import { MissingParamsError } from '../errors/missing-params'
import {
  makeSignUpController,
  DEFAULT_BODY
} from '../mocks/make-signUpController'

describe.skip('SignUp Controller errors', () => {
  test('Should return 400 if no name is provided', () => {
    const { signUpController, httpRequest } = makeSignUpController([
      { prop: 'name', value: '' }
    ])

    const httpResponse = signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError(['name']))
  })

  test('Should return 400 if no email is provided', () => {
    const { signUpController, httpRequest } = makeSignUpController([
      { prop: 'email', value: '' }
    ])

    const httpResponse = signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError(['email']))
  })

  test('Should return 400 if no password is provided', () => {
    const { signUpController, httpRequest } = makeSignUpController([
      { prop: 'password', value: '' }
    ])

    const httpResponse = signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError(['password']))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const { signUpController, httpRequest } = makeSignUpController([
      { prop: 'passwordConfirmation', value: '' }
    ])

    const httpResponse = signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamsError(['passwordConfirmation'])
    )
  })

  test('Should return 400 if no X parameters is provided', () => {
    const { signUpController, httpRequest } = makeSignUpController([
      { prop: 'email', value: '' },
      { prop: 'passwordConfirmation', value: '' }
    ])

    const httpResponse = signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamsError(['email', 'passwordConfirmation'])
    )
  })

  test('Should return 400 if invalid email', () => {
    const { signUpController, httpRequest } = makeSignUpController([
      { prop: 'email', value: 'invalid' }
    ])

    const httpResponse = signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamsError('email'))
  })

  test('Should return 400 if password is diferent from confirmationPassword', () => {
    const { signUpController, httpRequest } = makeSignUpController([
      { prop: 'password', value: 'pass' },
      { prop: 'confirmationPassword', value: 'passDifferent' }
    ])

    const httpResponse = signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new InvalidParamsError('confirmationPassword')
    )
  })
})

describe('SignUp correct integration with addAccount', () => {
  test('calls with correct values', () => {
    const { signUpController, httpRequest, addAccountStub } =
      makeSignUpController()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    signUpController.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(DEFAULT_BODY)
  })
  test('return 200 if valid data is provided', () => {
    const { signUpController, httpRequest, addAccountStub } =
      makeSignUpController()

    const httpResponse = signUpController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ id: 1 })
  })
})
