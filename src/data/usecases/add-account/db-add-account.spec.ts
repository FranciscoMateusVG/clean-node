import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve, reject) => {
          resolve('hashed_password')
        })
      }
    }

    const encrypterStub = new EncrypterStub()
    const dbAddAccount = new DbAddAccount(encrypterStub)
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
