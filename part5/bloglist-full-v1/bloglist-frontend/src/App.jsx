import { useState, useEffect, useRef } from 'react'
import helper from './utils/helper'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  // Refs
  const blogFormRef = useRef()

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

  // notification handlers
  const updateNotification = (content, error) => {
    setMessage((prev) => ({ ...prev, content, error }));
  }
  const clearNotification = () => {
    setMessage(null);
  }

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
        helper.callWithTimeout(
            2500,
            () => updateNotification(`${response.name} logged in`, false),
            () => clearNotification()
          )
        helper.resetFields(e, ['username', 'password'])
      })
      .catch((error) => {
        helper.callWithTimeout(
          5000,
          () => updateNotification(`${error.response.data.error}`, true),
          () => clearNotification()
        )
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
      .then((response) => {
        blogFormRef.current.toggleVisibility() // uses ref to update state inside child
        syncBlogs()
        helper.callWithTimeout(
          2500,
          () => updateNotification(`a new blog ${response.title} by ${response.author}`, false),
          () => clearNotification()
        )
        helper.resetFields(e, ['title', 'author', 'url'])
      })
      .catch((error) => {
        helper.callWithTimeout(
          5000,
          () => updateNotification(`${error.response.data.error}`, true),
          () => clearNotification()
        )
      })
  }

  // handle liking a blog
  const handleLikeBlog = (e, id) => {
    e.preventDefault()
    blogService
      .likeBlog(id)
      .then((response) => {
        syncBlogs()
        helper.callWithTimeout(
          2500,
          () => updateNotification(`liked blog ${response.title} by ${response.author}`, false),
          () => clearNotification()
        )
      })
      .catch((error) => {
        helper.callWithTimeout(
          5000,
          () => updateNotification(`${error.response.data.error}`, true),
          () => clearNotification()
        )
      })
  }

  // handle deleting a blog
  const handleDeleteBlog = (id) => {
    blogService
      .deleteBlog(id, user.token)
      .then(() => {
        syncBlogs()
        helper.callWithTimeout(
          2500,
          () => updateNotification('deleted blog', false),
          () => clearNotification()
        )
      })
      .catch((error) => {
        helper.callWithTimeout(
          5000,
          () => updateNotification(`${error.response.data.error}`, true),
          () => clearNotification()
        )
      })
  }

  return (
    <div>
      {message == null
      ? null
      : <Notification message={message}/>}
      {user == null 
      ? <LoginForm onLoginClick={handleUserLogin}/>
      : <Blogs user={user} blogs={blogs} onLogoutClick={handleUserLogout} 
        onCreateClick={handleCreateBlog} onLikeClick={handleLikeBlog} 
        onRemoveClick={handleDeleteBlog} blogFormRef={blogFormRef}/>
      }
    </div>
  )
}

export default App