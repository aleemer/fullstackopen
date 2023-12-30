const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 5000)
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({}) // delete all users in our test database
  // save our user
  const passwordHash = await bcrypt.hash(helper.initialUser.password, 10)
  const user = new User({ 
    username: helper.initialUser.username,
    name: helper.initialUser.name,
    passwordHash: passwordHash
   })

   await user.save()
})

describe('GET', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is one user', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
  })

  test('getting a specific user', async () => {
    const users = await helper.usersInDb()
    const userToGet = users[0]
    const validId = userToGet.id

    // Verify that we do get a user
    const response = await api
      .get(`/api/users/${validId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Verify that the user we get is the desired one 
    const userReceived = response.body
    expect(userToGet).toEqual(userReceived)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})