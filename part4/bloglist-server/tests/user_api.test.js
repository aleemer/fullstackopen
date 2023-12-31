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

  // save all users as promises, and resolve in parallel
  const promiseArray = helper.initialUsers.map(async user => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    user = new User({ ...user, passwordHash: passwordHash })
    return user.save()
  })
  await Promise.all(promiseArray)
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

describe('POST', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    // add the user
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // verify the user has been added
    const users = await helper.usersInDb()
    expect(users).toHaveLength(2)

    // verify the user added is the same as local user
    const userAdded = users[1]
    expect(newUser.username).toEqual(userAdded.username)
    expect(newUser.name).toEqual(userAdded.name)
  })

  test('username property missing causes 400', async () => {
    const noUsernameUser = {
      name: 'Matti Luukkainen',
      password: 'salainen'
    }
    // add the user, fail with 400
    await api
      .post('/api/users')
      .send(noUsernameUser)
      .expect(400)
  })

  test('password property missing causes 400', async () => {
    const noPasswordUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    }
    // add the user, fail with 400
    await api
      .post('/api/users')
      .send(noPasswordUser)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})