import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongo } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const accountMongo = new AccountMongo()
    const account = await accountMongo.add({
      name: 'name',
      email: 'email',
      password: 'password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })
})
