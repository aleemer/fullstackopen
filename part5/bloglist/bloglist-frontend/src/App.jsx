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

  // Syncs data from database to local state
  const syncBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  // On first load, state initialization
  useEffect(() => {
    // load in all blogs
    syncBlogs()
    // check localStorage for login
    setUser(helper.get('userLogin'))  
  }, [])

  // handle login
  const handleUserLogin = (e) => {
    e.preventDefault()
    const user = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    loginService
      .performLogin(user)
      .then((response) => {
        setUser(response)
        helper.save('userLogin', response)
        helper.resetFields(e, ['username', 'password'])
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  // handle logout
  const handleUserLogout = (e) => {
    e.preventDefault()
    setUser(null)
    helper.clear('userLogin')
  }

  // handle blog creation
  const handleCreateBlog = (e) => {
    e.preventDefault()
    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    blogService
      .createBlog(blog, user.token)
      .then(() => {
        syncBlogs()
        helper.resetFields(e, ['title', 'author', 'url'])
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  return (
    <div>
      {user == null 
      ? <LoginForm onLoginClick={handleUserLogin}/>
      : <Blogs user={user} blogs={blogs} onLogoutClick={handleUserLogout} onCreateClick={handleCreateBlog}/>
      }
    </div>
  )
}

export default App