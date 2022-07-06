import { InvalidParamsError } from '../errors/invalid-params'

export interface EmailValidator {
  isValid(email: string): void | InvalidParamsError
}
