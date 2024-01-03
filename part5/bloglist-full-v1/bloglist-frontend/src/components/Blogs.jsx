import BlogForm from './BlogForm'
import Blog from './Blog'

const Blogs = ({ blogs, user, onLogoutClick, onCreateClick }) => (
  <div>
    <h2>blogs</h2>
    <p>{user.username} logged in <button onClick={onLogoutClick}>logout</button></p>
    <BlogForm onCreateClick={onCreateClick}/>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </div>  
)

export default Blogs