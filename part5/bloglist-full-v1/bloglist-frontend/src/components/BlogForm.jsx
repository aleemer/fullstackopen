const BlogForm = ({ onCreateClick }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onCreateClick}>
        <div>title:<input name="title" required/></div>
        <div>author:<input name="author" required/></div>
        <div>url:<input name="url" required/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm