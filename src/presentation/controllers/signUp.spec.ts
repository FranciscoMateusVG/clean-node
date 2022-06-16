import { InvalidParamsError } from '../errors/invalid-params'
import { MissingParamsError } from '../errors/missing-params'
import { makeSignUpController } from '../mocks/make-signUpController'

describe('SignUp Controller errors', () => {
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
})
