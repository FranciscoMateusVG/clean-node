import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

type ReturnMakeDbAddAccount = {
  dbAddAccount: DbAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve, reject) => {
        resolve('hashed_password')
      })
    }
  }
  return new EncrypterStub()
}

const makeDbAddAccount = (): ReturnMakeDbAddAccount => {
  const encrypterStub = makeEncrypter()
  const dbAddAccount = new DbAddAccount(encrypterStub)

  return { dbAddAccount, encrypterStub }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { dbAddAccount, encrypterStub } = makeDbAddAccount()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'name',
      email: 'email',
      password: 'password'
    }
    await dbAddAccount.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('password')
  })
})
