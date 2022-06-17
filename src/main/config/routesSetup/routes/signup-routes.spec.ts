import request from 'supertest'
import app from '../../app'

describe('SignUp Routes', () => {
  test('should return account on success', async () => {
    await request(app)
      .post('/api/signUp')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: 'test',
        passwordConfirmation: 'test'
      })
      .expect(200)
  })
})
