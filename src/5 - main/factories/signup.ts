import { DbAddAccount } from '../../2 - data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../1 - infra/criptography/bcrypt-adapter'
import { SignUpController } from '../../4 - presentation/controllers/signUp'
import { EmailValidatorAdapter } from '../../utils/email-validator'
import { AccountMongo } from '../../1 - infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../4 - presentation/protocols/controller'
import { LogMongoRepository } from '../../1 - infra/db/mongodb/log-repository/log'

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongo = new AccountMongo()

  const addAccount = new DbAddAccount(bcryptAdapter, accountMongo)

  const signUpController = new SignUpController(emailValidator, addAccount)

  const logErrorRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logErrorRepository)
}
