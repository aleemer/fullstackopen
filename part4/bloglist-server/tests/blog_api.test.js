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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'My third blog',
    author: 'Jack Doe',
    url: 'http://www.example.com/blog3',
    likes: 4
  }
  // add the blog
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // verify the blog has been added
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  
  // verify the blog added is the same as the newBlog locally
  const blogAdded = response.body[2]
  delete blogAdded.id
  expect(listFn.sameObject(newBlog, blogAdded)).toBe(true)
})

afterAll(async () => {
  await mongoose.connection.close()
})