import { AddAccountModel } from '../../../3 - domain/usecases/add-account'
import { AccountModel } from '../../../3 - domain/usecases/models/account'
import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'
import { AddAccountRepository } from '../../protocols/add-account-repository'

type ReturnMakeDbAddAccount = {
  dbAddAccount: DbAddAccount
  encrypterStub: Encrypter
  addAccoutRepositoryStub: AddAccountRepository
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

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(newAccount: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve, reject) => {
        const fakeAccount = { id: '1' }
        resolve(fakeAccount)
      })
    }
  }
  return new AddAccountRepositoryStub()
}

const makeDbAddAccount = (): ReturnMakeDbAddAccount => {
  const encrypterStub = makeEncrypter()
  const addAccoutRepositoryStub = makeAddAccountRepository()
  const dbAddAccount = new DbAddAccount(encrypterStub, addAccoutRepositoryStub)

  return { dbAddAccount, encrypterStub, addAccoutRepositoryStub }
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

  test('Should throw if Encrypter throws', async () => {
    const { dbAddAccount, encrypterStub } = makeDbAddAccount()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const accountData = {
      name: 'name',
      email: 'email',
      password: 'password'
    }
    const promise = dbAddAccount.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccoutRepository with correct values', async () => {
    const { dbAddAccount, addAccoutRepositoryStub } = makeDbAddAccount()
    const addSpy = jest.spyOn(addAccoutRepositoryStub, 'add')
    const accountData = {
      name: 'name',
      email: 'email',
      password: 'password'
    }
    await dbAddAccount.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'name',
      email: 'email',
      password: 'hashed_password'
    })
  })

  test('Should return an account on success', async () => {
    const { dbAddAccount, addAccoutRepositoryStub } = makeDbAddAccount()
    const addSpy = jest.spyOn(addAccoutRepositoryStub, 'add')
    const accountData = {
      name: 'name',
      email: 'email',
      password: 'password'
    }
    const account = await dbAddAccount.add(accountData)

    expect(account).toEqual({
      id: '1'
    })
  })

  test('Should throw if AddAccountRepo throws', async () => {
    const { dbAddAccount, addAccoutRepositoryStub } = makeDbAddAccount()
    jest
      .spyOn(addAccoutRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const accountData = {
      name: 'name',
      email: 'email',
      password: 'password'
    }
    const promise = dbAddAccount.add(accountData)

    await expect(promise).rejects.toThrow()
  })
})
