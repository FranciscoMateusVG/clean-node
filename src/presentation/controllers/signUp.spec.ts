import { MissingParamsError } from '../errors/missing-params'
import { SignUpController } from './signUp'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const signUpController = new SignUpController()
    const httpRequest = {
      body: {
        email: 'email',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError(['name']))
  })

  test('Should return 400 if no email is provided', () => {
    const signUpController = new SignUpController()
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError(['email']))
  })

  test('Should return 400 if no password is provided', () => {
    const signUpController = new SignUpController()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError(['password']))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const signUpController = new SignUpController()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email',
        password: 'password'
      }
    }
    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamsError(['passwordConfirmation'])
    )
  })

  test('Should return 400 if no X parameters is provided', () => {
    const signUpController = new SignUpController()
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password'
      }
    }
    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamsError(['email', 'passwordConfirmation'])
    )
  })
})
