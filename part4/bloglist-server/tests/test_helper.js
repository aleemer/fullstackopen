const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}