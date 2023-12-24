const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// Import models
const Person = require('./models/person')

// Middleware -> our functions for middleware need to be taken into use before routes if we want them to be executed before the route event handlers are called
// app.use(express.static('dist')) // Tells express to use static content from build
app.use(express.json()) // Allows us to parse requests with JSON data
app.use(cors()); // Permitting requests from all origins

// morgan creating specific tokens
// create a token for content-length
morgan.token('res[content-length]', (req, res) => {
  return res.headers['Content-Length']
})

// create a token for req-body, convert req.body from JSON to string
morgan.token('req-body', (req, res) => {
  return JSON.stringify(req.body)
})

// The format we are using with tokens
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

// Server endpoint to handle info page
app.get('/info', (request, response) => {
  const info = `
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    </div>
  `
  response.send(info)
})

// Server endpoint to handle GET requests to '/api/persons'
app.get('/api/persons', (request, response, next) => {
  // Get data from database
  Person.find({})
  .then((persons) => {
    response.json(persons)
  })
  .catch((error) => next(error))
})

// Server endpoint to handle GET requests to '/api/persons/something'
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
  .then((person) => {
    response.json(person)
  })
  .catch((error) => next(error))
})

// Server endpoint to handle POST requests
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // handle case where name or number not in request
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  // TODO: name unique case -> this should replace the number
  // For now, handling this in PUT case

  // create person
  const person = new Person({
    name: body.name,
    number: body.number
  })
  // save to database
  person.save()
  .then((savedPerson) => {
    response.json(savedPerson)
  })
  .catch((error) => next(error))
})

// Server endpoint to handle PUT requests to '/api/persons/something'
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const newPerson = request.body

  if (!newPerson) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  Person.findByIdAndUpdate(id, newPerson, { new: true })
    .then((newPerson) => {
      console.log('added update', newPerson)
      response.json(newPerson)
    })
    .catch((error) => next(error))
})

// Server endpoint to handle DELETE requests to '/api/persons/something'
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(200).json(result)
    })
    .catch((error) => next(error))
})

// Execution order of middleware is the same as the order that they are loaded into express with app.use(...)

// Middleware to handle requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint '})
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

// Middleware to handle error
const errorHandler = (error, request, response, next) => {
  const statusCode = error.statusCode || 500
  const errorMessage = error.message || 'unknown error'
  response.status(statusCode).json({ error: errorMessage })

  next(); // Call next to ensure the request-response cycle continues
}

// handler of requests with result to errors
app.use(errorHandler)

// Server endpoint to handle GET requests to '/'
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})