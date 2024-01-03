import { useState, useEffect } from 'react'
import helper from './utils/helper'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})

  console.log('user is', user)

  // On first load, state initialization
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // handle login
  const handleUserLogin = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    const user = { username, password }
    loginService
      .performLogin(user)
      .then((response) => {
        setUser(response)
        helper.clearFields(e, ['username', 'password'])
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleUserLogin}>
        <div>username<input id="username" name="username" required/></div>
        <div>password<input id="password" name="password" required/></div>
        <button type="submit">login</button>
      </form>
      <h2>blogs</h2>
    </div>
  )
}

export default App