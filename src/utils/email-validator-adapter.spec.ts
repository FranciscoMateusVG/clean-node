import { InvalidParamsError } from '../presentation/errors/invalid-params'
import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Should throw if validator returns false', () => {
    const emailValidatorAdapter = new EmailValidatorAdapter()
    let error
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    try {
      emailValidatorAdapter.isValid('invalid_email@email.com')
    } catch (err) {
      error = err
    }

    expect(error).toEqual(new InvalidParamsError('email'))
  })

  test('Should NOT throw if validator returns true', () => {
    const emailValidatorAdapter = new EmailValidatorAdapter()
    let error
    try {
      emailValidatorAdapter.isValid('email@mail.com')
    } catch (err) {
      error = err
    }

    expect(error).toBe(undefined)
  })

  test('Should call validator with correct email', () => {
    const emailValidatorAdapter = new EmailValidatorAdapter()
    let error
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    emailValidatorAdapter.isValid('any_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
