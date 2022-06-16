import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account'
import { AccountModel } from '../../domain/usecases/models/account'
import { SignUpController } from '../controllers/signUp'
import { InvalidParamsError } from '../errors/invalid-params'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest } from '../protocols/http'

type MakeSignUpController = {
  signUpController: SignUpController
  httpRequest: HttpRequest<DefaultBody>
  addAccountStub: AddAccount
}

type ModProperties = { prop: string; value: string }

export type DefaultBody = {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

const DEFAULT_BODY = {
  name: 'name',
  email: 'email',
  password: 'pass',
  passwordConfirmation: 'pass'
}

export const makeSignUpController = (
  body: DefaultBody = DEFAULT_BODY
): MakeSignUpController => {
  // Making the HttpRequest
  const httpRequest = {
    body
  }

  // Making the signUpController
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const signUpController = new SignUpController(
    emailValidatorStub,
    addAccountStub
  )

  return { signUpController, httpRequest, addAccountStub }
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): void | InvalidParamsError {
      if (email === 'invalid') {
        throw new InvalidParamsError('email')
      }
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(newAccount: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 1
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}
