const express = require('express')
const app = express()

app.use(express.json()) // Allows us to parse requests with JSON data

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// Server endpoint to handle GET requests to '/'
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Server endpoint to handle GET requests to '/api/notes'
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// Server endpoint to handle all GET requests of the form '/api/notes/something'
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => id === note.id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end();
  }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

// Server endpoint to handle all POST requests
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false
  }

  notes = notes.concat(note)
  response.json(note)
})

// Server endpoint to handle all DELETE requests of the form '/api/notes/something'
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end();
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})