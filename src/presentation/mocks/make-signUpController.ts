import { SignUpController } from '../controllers/signUp'
import { InvalidParamsError } from '../errors/invalid-params'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest } from '../protocols/http'

type MakeSignUpController = {
  signUpController: SignUpController
  httpRequest: HttpRequest
}

type ModProperties = { prop: string; value: string }

export const makeSignUpController = (
  modProperties: ModProperties[] = []
): MakeSignUpController => {
  // Making the HttpRequest
  const body = {
    name: 'name',
    email: 'email',
    password: 'pass',
    passwordConfirmation: 'pass'
  }

  modProperties.forEach(({ prop, value }) => (body[prop] = value))
  const httpRequest = {
    body
  }

  // Making the signUpController
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): void | InvalidParamsError {
      if (email === 'invalid') {
        throw new InvalidParamsError('email')
      }
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const signUpController = new SignUpController(emailValidatorStub)

  return { signUpController, httpRequest }
}
