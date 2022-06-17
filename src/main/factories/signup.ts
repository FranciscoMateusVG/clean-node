import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { SignUpController } from '../../presentation/controllers/signUp'
import { EmailValidatorAdapter } from '../../utils/email-validator'
import { AccountMongo } from '../../infra/db/mongodb/account-repository/account'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongo = new AccountMongo()

  const addAccount = new DbAddAccount(bcryptAdapter, accountMongo)

  return new SignUpController(emailValidator, addAccount)
}
