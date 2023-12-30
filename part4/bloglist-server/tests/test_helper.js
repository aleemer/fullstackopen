const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'My first blog',
    author: 'John Doe',
    url: 'http://www.example.com/blog1',
    likes: 3
  },
  {
    title: 'My second blog',
    author: 'Jane Doe',
    url: 'http://www.example.com/blog2',
    likes: 2
  }
]

const initialUser = {
  uername: 'aleemer',
  name: 'Aleem Tariq',
  password: 'wishfuldjinn'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUser,
  blogsInDb,
  usersInDb
}