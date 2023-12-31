const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// Handles GET requests
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  return response.json(blogs)
})

// Handles GET:id requests
blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id).populate('user')
  return response.json(blog)
})

// Handles POST requests
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body || !body.title || !body.url) {
    return response.status(400).send({ error: 'Content missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || 'unknown',
    user: user._id,
    url: body.url,
    likes: body.likes || 0,
  })

  // save blog, and update the user to have that blogId
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  return response.status(201).json(savedBlog)
})

// Handles PUT:id requests
blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  const updatedBlog = await Blog.findByIdAndUpdate(id, { likes: blog.likes + 1 }, { new: true })
  return response.json(updatedBlog)
})

// Handles DELETE:id requests
blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogsRouter