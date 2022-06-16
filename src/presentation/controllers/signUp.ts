import { MissingParamsError } from '../errors/missing-params'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      verifyRequiredFields(httpRequest)
      this.emailValidator.isValid(httpRequest.body.email)

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
