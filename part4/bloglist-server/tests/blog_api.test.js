const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 5000)
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const clearData = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
}

beforeEach(async () => {
  // Clear database
  await clearData()
  
  // Setup user database
  const userPromiseArray = helper.initialUsers.map(async user => {
    // save user(s)
    const passwordHash = await bcrypt.hash(user.password, 10)
    user = new User({ ...user, passwordHash: passwordHash })
    return user.save()
  })
  await Promise.all(userPromiseArray)

  // Get user id of the first user in our database (and only)
  const userId = await helper.getUserObjId()

  // Setup blog database
  const blogPromiseArray = helper.initialBlogs.map(async blog => {
    // save blog(s)
    const newBlog = new Blog({ ...blog, user: userId })
    await newBlog.save()
    // update user
    await User.findByIdAndUpdate(userId, { $push: { blogs: newBlog._id }})
  })
  await Promise.all(blogPromiseArray)
})

describe('GET', () => {
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
  
  test('the two blogs equal our initialBlogs', async () => {
    const response = await api.get('/api/blogs')
    const receivedBlogs = response.body.map((blog) => { return { title: blog.title, author: blog.author,
        url: blog.url, likes: blog.likes }})
  
    const sortedReceived = receivedBlogs.sort((a, b) => b.likes - a.likes)
    const sortedInitial = helper.initialBlogs.sort((a, b) => b.likes - a.likes)
    expect(sortedReceived).toEqual(sortedInitial)
  })

  test('viewing a specific blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToGet = blogs[0]
    const validId = blogToGet.id
  
    // Verify that we do get a blog
    const response = await api
      .get(`/api/blogs/${validId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    // Verify that the blog we get is the desired one (only compare title, author, likes, id)
    const blogReceived = response.body
    const fieldsToCompare = ['title', 'author', 'likes', 'id']
    fieldsToCompare.map(field => expect(blogToGet[field]).toEqual(blogReceived[field]))
  })
  
  test('fails if id is invalid', async () => {
    const id = 'test'
  
    // Verify that we get an error
    const response = await api
    .get(`/api/blogs/${id}`)
    .expect(400)
  
    // Verify that the error is the correct type
    expect(response.body).toEqual({ error: 'malformatted id' })
  })
})

describe('id uniqueness', () => {
  test('id exists in a blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogIDs = blogs.map(blog => blog.id)
    expect(blogIDs).toHaveLength(2)
  })
  
  test('id is a unique identifier for a blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogIDs = blogs.map(blog => blog.id)
    expect(listHelper.uniqueArraySimple(blogIDs)).toBe(true)
  })
})

describe('POST', () => {
  test('a valid blog can be added', async () => {
    // Perform login and get token of user who is adding blog
    const { username, password } = helper.initialUsers[0]
    const login = await api
      .post('/api/login')
      .send({ username, password })
      .expect(200)
    const token = login.body.token

    const newBlog = {
      title: 'My third blog',
      author: 'Jack Doe',
      url: 'http://www.example.com/blog3',
      likes: 4
    }
    // add the blog
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    // verify the blog has been added
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    
    // verify the blog added is the same as the newBlog locally
    const blogAdded = blogs[2]
    const fieldsToCompare = ['title', 'author', 'likes']
    fieldsToCompare.map(field => expect(newBlog[field]).toEqual(blogAdded[field]))

    // verify the blog added is reflected in the user
    const userId = await helper.getUserId()
    const response = await api
      .get(`/api/users/${userId}`)
      .expect(200)
    const user = response.body
    expect(user.blogs.length).toEqual(helper.initialBlogs.length + 1)
    expect(JSON.stringify(user.id)).toEqual(JSON.stringify(blogAdded.user))
  })
  
  test('likes property missing defaults to 0', async () => {
    // Perform login and get token of user who is adding blog
    const { username, password } = helper.initialUsers[0]
    const login = await api
      .post('/api/login')
      .send({ username, password })
      .expect(200)
    const token = login.body.token

    const unpopularBlog = {
      title: 'My third blog',
      author: 'Jack Doe',
      url: 'http://www.example.com/blog3',
    }
    // add the blog
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(unpopularBlog)

    // verify the blog has been added
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    // verify the blog added has likes:0
    const blogAdded = blogs[2]
    expect(blogAdded.likes).toEqual(0)
  })
  
  test('title property missing causes 400', async () => {
    // Perform login and get token of user who is adding blog
    const { username, password } = helper.initialUsers[0]
    const login = await api
      .post('/api/login')
      .send({ username, password })
      .expect(200)
    const token = login.body.token

    const noTitleBlog = {
      author: 'Jack Doe',
      url: 'http://www.example.com/blog3',
      likes: 4
    }
    // add the blog, fail with 400
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(noTitleBlog)
      .expect(400)
  })
  
  test('url property missing causes 400', async () => {
    // Perform login and get token of user who is adding blog
    const { username, password } = helper.initialUsers[0]
    const login = await api
      .post('/api/login')
      .send({ username, password })
      .expect(200)
    const token = login.body.token

    const noUrlBlog = {
      title: 'My third blog',
      author: 'Jack Doe',
      likes: 4
    }
    // add the blog, fail with 400
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(noUrlBlog)
      .expect(400)
  })

  test('missing token causes authorization error', async () => {
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
      .expect(401)
  })
})

describe('PUT', () => {
  test('updating likes succeeds', async () => {
    const blogs = await helper.blogsInDb()
    const blogToLike = blogs[0]
    const validId = blogToLike.id
  
    // Verify that we perform a successful update
    const response = await api
      .put(`/api/blogs/${validId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    // Verify that only likes changes
    const updatedBlog = response.body
    expect(updatedBlog.likes).toEqual(blogToLike.likes + 1)
  })
})

describe('DELETE', () => {
  test('deletion succeeds if user is authorized', async () => {
    // Perform login and get token of user who is adding blog
    const { username, password } = helper.initialUsers[0]
    const login = await api
      .post('/api/login')
      .send({ username, password })
      .expect(200)
    const token = login.body.token

    // Delete a particular blog (created by that same user)
    const oldBlogs = await helper.blogsInDb()
    const blogToDelete = oldBlogs[0]
    const validId = blogToDelete.id
  
     // Verify that we perform a successful deletion
     await api
     .delete(`/api/blogs/${validId}`)
     .set('Authorization', `Bearer ${token}`)
     .expect(204)
  
    // Verify that the deletion updates the database
    const newBlogs = await helper.blogsInDb()
    expect(newBlogs).toHaveLength(oldBlogs.length - 1)

    // TODO: Verify that the deletion is reflected in the user
    // Unnecessary for now, but in future, think about this
  })
  
  test('fails if token is invalid', async () => {
     // Delete a particular blog (created by that same user)
     const oldBlogs = await helper.blogsInDb()
     const blogToDelete = oldBlogs[0]
     const validId = blogToDelete.id
   
      // Verify that deletion fails
      await api
      .delete(`/api/blogs/${validId}`)
      .set('Authorization', `Bearer 1234`)
      .expect(401)
  })

  test('fails if the deletion is unauthorized', async () => {
    // Create a new user and add to database
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

    // Perform login with that user
    const login = await api
      .post('/api/login')
      .send({ 
        username: newUser.username,
        password: newUser.password
       })
      .expect(200)
    const token = login.body.token

    // Try to delete a particular blog (not created by that user), verify it fails
    const oldBlogs = await helper.blogsInDb()
    const blogToDelete = oldBlogs[0]
    const validId = blogToDelete.id
    await api
      .delete(`/api/blogs/${validId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})