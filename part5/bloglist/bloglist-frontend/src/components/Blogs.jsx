import Blog from './Blog'

const Blogs = ({ blogs, user, onLogoutClick }) => (
  <div>
    <h2>blogs</h2>
    <p>{user.username} logged in <button onClick={onLogoutClick}>logout</button></p>
    {blogs.map(blog => <Blog blog={blog} />)}
  </div>  
)

export default Blogs