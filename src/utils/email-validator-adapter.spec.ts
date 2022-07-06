import { InvalidParamsError } from '../4 - presentation/errors/invalid-params'
import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  let emailValidatorAdapter: EmailValidatorAdapter
  let error

  beforeEach(() => {
    emailValidatorAdapter = new EmailValidatorAdapter()
    error = undefined
  })

  test('Should throw if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    try {
      emailValidatorAdapter.isValid('invalid_email@email.com')
    } catch (err) {
      error = err
    }

    expect(error).toEqual(new InvalidParamsError('email'))
  })

  test('Should NOT throw if validator returns true', () => {
    try {
      emailValidatorAdapter.isValid('email@mail.com')
    } catch (err) {
      error = err
    }

    expect(error).toBe(undefined)
  })

  test('Should call validator with correct email', () => {
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    emailValidatorAdapter.isValid('any_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
