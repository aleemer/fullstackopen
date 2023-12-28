const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogs")
const mongoose = require('mongoose')

mongoose.set("strictQuery", false)

// MongoDB Connection
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('successful connection to MongoDB',))
  .catch((error) => console.log('error connecting...', error.message))

// App setup
app.use(cors())
app.use(express.json())
  // Add Blog router for endpoints to that resource
app.use('/api/blogs', blogsRouter)

module.exports = app
