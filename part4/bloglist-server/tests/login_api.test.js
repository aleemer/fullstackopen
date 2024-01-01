const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 5000)
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

const clearData = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
}

beforeEach(async () => {
  // Clear database
  await clearData()

  // Add a default user to the database to perform login
  const userPromiseArray = helper.initialUsers.map(async user => {
    // save user(s)
    const passwordHash = await bcrypt.hash(user.password, 10)
    user = new User({ ...user, passwordHash: passwordHash })
    return user.save()
  })
  await Promise.all(userPromiseArray)
})

describe('POST', () => {
  test('login with correct password', async () => {
    const { username, password } = helper.initialUsers[0]
    
    const response = await api
      .post('/api/login')
      .send({ username, password })
      .expect(200)
    
    // Verify the token is included (basic string verification)
    expect(response.body).toHaveProperty('token')
    expect(typeof response.body.token).toBe('string')
  })

  test('login with incorrect password', async () => {
    const { username } = helper.initialUsers[0]
    await api
      .post('/api/login')
      .send({ username, password: 'incorrect' })
      .expect(401)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})