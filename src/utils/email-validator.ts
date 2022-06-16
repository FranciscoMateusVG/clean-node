import { InvalidParamsError } from '../presentation/errors/invalid-params'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidatorAdapter {
  isValid(email: string): void | InvalidParamsError {
    if (!validator.isEmail(email)) throw new InvalidParamsError('email')
  }
}
