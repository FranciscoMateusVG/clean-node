import { AddAccount } from '../../domain/usecases/add-account'
import { InvalidParamsError } from '../errors/invalid-params'
import { MissingParamsError } from '../errors/missing-params'
import { badRequest } from '../helpers/http-helper'
import { DefaultBody } from '../mocks/make-signUpController'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle(httpRequest: HttpRequest<DefaultBody>): HttpResponse {
    try {
      verifyRequiredFields(httpRequest)
      this.emailValidator.isValid(httpRequest.body.email)
      verifyPasswordEqualsConfirmationPassword(httpRequest)

      this.addAccount.add(httpRequest.body)

      return { statusCode: 200, body: 'OK' }
    } catch (error) {
      return badRequest(error)
    }
  }
}

const verifyRequiredFields = (httpRequest): void | MissingParamsError => {
  const requiredFields = [
    'name',
    'email',
    'password',
    'passwordConfirmation'
  ].filter((requiredField) => !httpRequest.body[requiredField])

  if (requiredFields.length > 0) throw new MissingParamsError(requiredFields)
}

const verifyPasswordEqualsConfirmationPassword = (
  httpRequest: HttpRequest<DefaultBody>
): void | InvalidParamsError => {
  const {
    body: { password, passwordConfirmation }
  } = httpRequest

  if (password !== passwordConfirmation)
    throw new InvalidParamsError('confirmationPassword')
}
