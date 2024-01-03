import Blog from './Blog'

const Blogs = ({ blogs, user }) => (
  <div>
    <h2>blogs</h2>
    <p>{user.username} logged in</p>
    {blogs.map(blog => <Blog blog={blog} />)}
  </div>  
)

export default Blogs