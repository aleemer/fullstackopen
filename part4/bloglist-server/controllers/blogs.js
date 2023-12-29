const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Handles GET requests
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// Handles POST requests
blogsRouter.post('/', (request, response) => {
  const body = request.body

  if (!body || !body.title || !body.url) {
    return response.status(400).send({ error: 'Content missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || 'unknown',
    url: body.url,
    likes: body.likes || 0
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter