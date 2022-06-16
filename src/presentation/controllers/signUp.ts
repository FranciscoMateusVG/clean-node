import { MissingParamsError } from '../errors/missing-params'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const missingRequiredFields = verifyRequiredFields(httpRequest)

    if (missingRequiredFields.length > 0)
      return badRequest(new MissingParamsError(missingRequiredFields))

    return { statusCode: 200, body: 'OK' }
  }
}

const verifyRequiredFields = (httpRequest): string[] => {
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

  return requiredFields.filter(
    (requiredField) => !httpRequest.body[requiredField]
  )
}
