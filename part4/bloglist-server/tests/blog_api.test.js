const supertest = require('supertest')
const helper = require('./test_helper')
const listFn = require('../utils/list_helper')
const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({}) // delete all blogs in our test database
  // save all blogs as promises, and resolve in parallel
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('id exists in a blog', async () => {
  const response = await api.get('/api/blogs')
  const blogIDs = response.body.map(blog => blog.id)
  expect(blogIDs).toHaveLength(2)
})

test('id is a unique identifier for a blog', async () => {
  const response = await api.get('/api/blogs')
  const blogIDs = response.body.map(blog => blog.id)
  expect(listFn.uniqueArraySimple(blogIDs)).toBe(true)
})

afterAll(async () => {
  await mongoose.connection.close()
})