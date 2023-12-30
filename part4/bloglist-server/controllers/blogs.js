const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Handles GET requests
blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

// Handles GET:id requests
blogsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id

  Blog
    .findById(id)
    .then(blog => {
      return response.json(blog)
    })
    .catch(error => next(error))
})

// Handles POST requests
blogsRouter.post('/', (request, response, next) => {
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
    .catch(error => next(error))
})

// Handles PUT:id requests
blogsRouter.put('/:id', (request, response, next) => {
  const id = request.params.id

  Blog
    .findById(id)
    .then((blog) => {
      Blog
        .findByIdAndUpdate(id, { likes: blog.likes + 1 }, { new: true })
        .then(updatedBlog => {
          return response.json(updatedBlog)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

// Handles DELETE:id requests
blogsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  Blog
    .findByIdAndDelete(id)
    .then(blog => {
      return response.status(204).send()
    })
    .catch(error => next(error))
})

module.exports = blogsRouter