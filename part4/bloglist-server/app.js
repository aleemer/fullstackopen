const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogs")
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
app.use('/api/blogs', blogsRouter)    // Add Blog router for endpoints to that resource

module.exports = app
