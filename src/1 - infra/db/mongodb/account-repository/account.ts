import { AddAccountRepository } from '../../../../2 - data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../3 - domain/usecases/add-account'
import { AccountModel } from '../../../../3 - domain/usecases/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongo implements AddAccountRepository {
  async add(newAccount: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(newAccount)
    const id = result.insertedId
    const accountCreated = { id: id.toString() }

    return accountCreated
  }
}
