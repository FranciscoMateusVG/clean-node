import {
  AddAccount,
  AddAccountModel
} from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/usecases/models/account'
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
