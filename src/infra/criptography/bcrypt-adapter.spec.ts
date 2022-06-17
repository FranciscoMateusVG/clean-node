import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const SALT = 12

const makeBcryptAdapter = (): BcryptAdapter => {
  return new BcryptAdapter(SALT)
}

describe('Bcrypt adapter', () => {
  test('Should call BCrypt with correct value', async () => {
    const bcryptAdapter = makeBcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await bcryptAdapter.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('Should return BCrypt hashed value', async () => {
    const bcryptAdapter = makeBcryptAdapter()
    // @ts-ignore
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce('#valueHashed')
    const hashedValue = await bcryptAdapter.encrypt('any_value')
    expect(hashedValue).toBe('#valueHashed')
  })

  test('Should throw if BCrypt throws', async () => {
    const bcryptAdapter = makeBcryptAdapter()
    const promise = new Promise<any>((resolve, reject) => reject(new Error()))
    // @ts-ignore
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(promise)
    const hashedValue = bcryptAdapter.encrypt('any_value')
    await expect(hashedValue).rejects.toThrow()
  })
})
