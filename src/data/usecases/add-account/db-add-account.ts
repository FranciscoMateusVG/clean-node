import {
  AddAccount,
  AddAccountModel
} from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/usecases/models/account'
import { Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add(newAccount: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(newAccount.password)
    return new Promise((resolve) => resolve(null))
  }
}
