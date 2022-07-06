import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { SignUpController } from '../../presentation/controllers/signUp'
import { EmailValidatorAdapter } from '../../utils/email-validator'
import { AccountMongo } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongo = new AccountMongo()

  const addAccount = new DbAddAccount(bcryptAdapter, accountMongo)

  const signUpController = new SignUpController(emailValidator, addAccount)
  // @ts-ignore
  return new LogControllerDecorator(signUpController)
}
