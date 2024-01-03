import { useState, useEffect } from 'react'
import helper from './utils/helper'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

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
    console.log('attempting login with ', user)
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App