import { useState } from 'react'

const Blog = ({ user, blog, onLikeClick, onRemoveClick }) => {
  const [show, setShow] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemove = () => {
    return user.username === blog.user.username
  }

  const handleClickShow = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  const handleClickRemove = (e, id) => {
    e.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      onRemoveClick(id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className="default-blog-display">
        {blog.title} {blog.author}
        <button id="view-details" onClick={handleClickShow}>{show ? 'hide' : 'show'}</button>
      </div>
      {show &&
      <div className="hidden-blog-display">
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button id="like-blog" onClick={(e) => onLikeClick(e, blog.id)}>like</button></div>
        <div>{blog.user.name}</div>
        {showRemove() && <button id="remove-blog" onClick={(e) => handleClickRemove(e, blog.id)}>remove</button>}
      </div>}
  </div>
  )
}

export default Blog