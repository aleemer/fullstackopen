const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})