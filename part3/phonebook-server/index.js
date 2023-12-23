const express = require('express')
const app = express()

app.use(express.json()) // Allows us to parse requests with JSON data

const persons = [
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

// Server endpoint to handle GET requests to '/api/persons'
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Server endpoint to handle GET requests to '/'
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})