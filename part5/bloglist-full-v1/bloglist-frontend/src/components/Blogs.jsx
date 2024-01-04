import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

const Blogs = ({ blogs, user, onLogoutClick, onCreateClick, blogFormRef }) => (
  <div>
    <h2>blogs</h2>
    <p>{user.username} logged in <button onClick={onLogoutClick}>logout</button></p>
    <Togglable buttonLabel='create' ref={blogFormRef}>
      <BlogForm onCreateClick={onCreateClick}/>
    </Togglable>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </div>  
)

export default Blogs