import { useState, useEffect } from 'react'
import helper from './utils/helper'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
      {user == null 
      ? <LoginForm onLoginClick={handleUserLogin}/>
      : <Blogs user={user} blogs={blogs}/>
      }
    </div>
  )
}

export default App