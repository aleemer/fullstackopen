const express = require('express')
const app = express()

app.use(express.json()) // Allows us to parse requests with JSON data

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

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
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Server endpoint to handle GET requests to '/api/persons/something'
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (!person) {
    response.status(404).end()
  } else {
    response.json(person);
  }
})

// Server endpoint to handle POST requests
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = {
    id: persons.length + 1,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.status(200).json(person)
})

// Server endpoint to handle DELETE requests to '/api/persons/something'
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// Server endpoint to handle GET requests to '/'
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})