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
  const user = request.user 

  if (!body || !body.title || !body.url) {
    return response.status(400).send({ error: 'Content missing' })
  }

  if (!user) {
    return response.status(401).send({ error: 'Unauthorized blog creation' })
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
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'Unauthorized deletion' })
  }

  // check if user deleting blog owns the blog
  const blog = await Blog.findById(id)
  if (JSON.stringify(blog.user) !== JSON.stringify(user._id)) {
    return response.status(401).json({ error: 'Unauthorized deletion' })
  }

  // delete blog, and update user to not have that blog id
  await Blog.findByIdAndDelete(id)
  user.blogs = user.blogs.filter(b => JSON.stringify(b) !== JSON.stringify(blog._id))
  await user.save()
  response.status(204).end()
})

module.exports = blogsRouter