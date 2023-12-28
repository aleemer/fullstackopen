require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set("strictQuery", false)

// App setup
app.use(cors())
app.use(express.json())

// Blog schema
const Blog = require('./models/blog')

// MongoDB Connection
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => console.log('successful connection to bloglist-server database',))
  .catch((error) => console.log('error connecting...', error))


// Endpoints
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})