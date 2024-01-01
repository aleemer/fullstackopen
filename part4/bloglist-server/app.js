const config = require('./utils/config')
const express = require('express')
require('express-async-errors') 
const app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.set("strictQuery", false)

logger.info('connecting to...', config.MONGODB_URI)

// MongoDB Connection
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('successful connection to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB: ', error.message))

// App setup
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(middleware.tokenExtractor)    // Add token extractor before routes, so it exists in request object

app.use('/api/blogs',
  middleware.userExtractor,
  blogsRouter)                        // Add Blog router for endpoints to that resource w/user middleware
app.use('/api/users', usersRouter)    // Add User router for endpoints to that resource
app.use('/api/login', loginRouter)    // Add Login router for endpoints to that resoruce

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
