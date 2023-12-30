const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Handles GET:id requests
usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const user = await User.findById(id)
  return response.json(user)
})

// Handles POST requests
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, name, passwordHash
  })

  const savedUser = await user.save()
  return response.status(201).json(savedUser)
})

module.exports = usersRouter