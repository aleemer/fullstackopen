import { useState } from 'react'

const Blog = ({ blog, onLikeClick }) => {
  const [show, setShow] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClickShow = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleClickShow}>{show ? 'hide' : 'show'}</button>
      </div>
      {show &&
      <>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={(e) => onLikeClick(e, blog.id)}>like</button></div>
        <div>{blog.user.name}</div>
      </>}
  </div>
)}

export default Blog