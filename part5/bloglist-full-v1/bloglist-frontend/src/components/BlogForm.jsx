const BlogForm = ({ onCreateClick }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onCreateClick}>
        <div>title:<input id="title" name="title" required/></div>
        <div>author:<input id="author" name="author" required/></div>
        <div>url:<input id="url" name="url" required/></div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm