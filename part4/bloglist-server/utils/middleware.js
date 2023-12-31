const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint '})
}

// Probably unnecessary, but copied it over from part3
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } else {
    // Handle any other error
    return response.status(500).json({ error: error.message })
  }
}

// Gets token and adds it to the request object
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

// Get the user and add it to the request object
const userExtractor = async (request, response, next) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   request.user = null
  // } else {
  //   request.user = await User.findById(decodedToken.id)
  // }
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}