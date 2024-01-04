import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

const Blogs = ({ blogs, user, onLogoutClick, onCreateClick, onLikeClick, onRemoveClick, blogFormRef }) => (
  <div>
    <h2>blogs</h2>
    <p>{user.username} logged in <button onClick={onLogoutClick}>logout</button></p>
    <Togglable buttonLabel='create' ref={blogFormRef}>
      <BlogForm onCreateClick={onCreateClick}/>
    </Togglable>
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog => <Blog key={blog.id} user={user} blog={blog} onLikeClick={onLikeClick} onRemoveClick={onRemoveClick}/>)
    }
  </div>  
)

export default Blogs