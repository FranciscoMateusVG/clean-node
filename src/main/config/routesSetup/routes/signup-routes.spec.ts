import request from 'supertest'
import { MongoHelper } from '../../../../infra/db/mongodb/helpers/mongo-helper'
import app from '../../app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  test('should return account on success', async () => {
    const response = await request(app).post('/api/signUp').send({
      name: 'test',
      email: 'test@example.com',
      password: 'test',
      passwordConfirmation: 'test'
    })
    expect(response.status).toBe(200)
    const schema = expect.objectContaining({ id: expect.any(String) })
    expect(response.body).toEqual(schema)
  })
})
