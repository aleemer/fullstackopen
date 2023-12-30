const supertest = require('supertest')
const helper = require('./test_helper')
const listFn = require('../utils/list_helper')
const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 5000)
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

test('GET: blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('GET: there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

// TODO: Fix this test
test('GET: the two blogs equal our initialBlogs', async () => {
  const response = await api.get('/api/blogs')
  const receivedBlogs = response.body.map((blog) => { return { title: blog.title, author: blog.author,
      url: blog.url, likes: blog.likes }})

  // sort to compare -> TODO: why was this giving me an error?
  const sortedReceived = receivedBlogs.sort((a, b) => b.likes - a.likes)
  const sortedInitial = helper.initialBlogs.sort((a, b) => b.likes - a.likes)
  expect(sortedReceived).toEqual(sortedInitial)
})

test('id exists in a blog', async () => {
  const blogs = await helper.blogsInDb()
  const blogIDs = blogs.map(blog => blog.id)
  expect(blogIDs).toHaveLength(2)
})

test('id is a unique identifier for a blog', async () => {
  const blogs = await helper.blogsInDb()
  const blogIDs = blogs.map(blog => blog.id)
  expect(listFn.uniqueArraySimple(blogIDs)).toBe(true)
})

test('GET: viewing a specific blog', async () => {
  const blogs = await helper.blogsInDb()
  const blogToGet = blogs[0]
  const validId = blogToGet.id

  // Verify that we do get a blog
  const response = await api
    .get(`/api/blogs/${validId}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // Verify that the blog we get is the desired one
  const blogReceived = response.body
  expect(blogToGet).toEqual(blogReceived)
})

test('GET: fails if id is invalid', async () => {
  const id = 'test'

  // Verify that we get an error
  const response = await api
  .get(`/api/blogs/${id}`)
  .expect(400)

  // Verify that the error is the correct type
  expect(response.body).toEqual({ error: 'malformatted id' })
})

test('POST: a valid blog can be added', async () => {
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
  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  
  // verify the blog added is the same as the newBlog locally
  const blogAdded = blogs[2]
  delete blogAdded.id
  expect(newBlog).toEqual(blogAdded)
})

test('POST: likes property missing defaults to 0', async () => {
  const unpopularBlog = {
    title: 'My third blog',
    author: 'Jack Doe',
    url: 'http://www.example.com/blog3',
  }
  // add the blog
  await api.post('/api/blogs').send(unpopularBlog)
  // verify the blog has been added
  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  // verify the blog added has likes:0
  const blogAdded = blogs[2]
  expect(blogAdded.likes).toEqual(0)
})

test('POST: title property missing causes 400', async () => {
  const noTitleBlog = {
    author: 'Jack Doe',
    url: 'http://www.example.com/blog3',
    likes: 4
  }
  // add the blog, fail with 400
  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)
})

test('POST: url property missing causes 400', async () => {
  const noUrlBlog = {
    title: 'My third blog',
    author: 'Jack Doe',
    likes: 4
  }
  // add the blog, fail with 400
  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)
})

test('PUT: updating likes succeeds', async () => {
  const blogs = await helper.blogsInDb()
  const blogToLike = blogs[0]
  const validId = blogToLike.id

  // Verify that we perform a successful update
  const response = await api
    .put(`/api/blogs/${validId}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // Verify that likes changes
  const updatedBlog = response.body
})

test('DELETE: succeeds with 204 if id is valid', async () => {
  const oldBlogs = await helper.blogsInDb()
  const blogToDelete = oldBlogs[0]
  const validId = blogToDelete.id

   // Verify that we perform a successful deletion
   await api
   .delete(`/api/blogs/${validId}`)
   .expect(204)

  // Verify that the blog we delete is the desired one
  const newBlogs = await helper.blogsInDb()
  expect(newBlogs).toHaveLength(oldBlogs.length - 1)
  expect(blogToDelete).not.toEqual(newBlogs[0])
})

test('DELETE: fails if id is invalid', async () => {
  const id = 'test'

  // Verify that we get an error
  const response = await api
  .delete(`/api/blogs/${id}`)
  .expect(400)

  // Verify that the error is the correct type
  expect(response.body).toEqual({ error: 'malformatted id' })
})

afterAll(async () => {
  await mongoose.connection.close()
})