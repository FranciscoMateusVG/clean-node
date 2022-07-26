import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('Log mongo repository', () => {
  let errorsCollection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorsCollection = await MongoHelper.getCollection('errors')
    await errorsCollection.deleteMany({})
  })

  test('If we call log error it should create a new error on success', async () => {
    const logMongoRepository = new LogMongoRepository()
    await logMongoRepository.log('any_error')
    const count = await errorsCollection.countDocuments()
    expect(count).toBe(1)
  })
})
