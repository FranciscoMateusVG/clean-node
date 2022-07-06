import {
  AddAccount,
  AddAccountModel
} from '../../../3 - domain/usecases/add-account'
import { AccountModel } from '../../../3 - domain/usecases/models/account'
import { AddAccountRepository } from '../../protocols/add-account-repository'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccoutRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter
    this.addAccoutRepository = addAccoutRepository
  }

  async add(newAccount: AddAccountModel): Promise<AccountModel> {
    const hashedPasword = await this.encrypter.encrypt(newAccount.password)
    const newAccountWithHashedPasword = Object.assign({}, newAccount, {
      password: hashedPasword
    })
    const account = await this.addAccoutRepository.add(
      newAccountWithHashedPasword
    )
    return account
  }
}
