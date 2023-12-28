require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogs")
const mongoose = require('mongoose')

mongoose.set("strictQuery", false)

// MongoDB Connection
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => console.log('successful connection to bloglist-server database',))
  .catch((error) => console.log('error connecting...', error))

// App setup
app.use(cors())
app.use(express.json())
  // Add Blog router for endpoints to that resource
app.use('/api/blogs', blogsRouter)

module.exports = app
