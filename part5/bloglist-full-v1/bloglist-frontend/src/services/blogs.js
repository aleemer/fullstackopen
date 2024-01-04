import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (blog, token) => {
  const request = axios.post(baseUrl, blog, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return request.then(response => response.data)
}

const likeBlog = (id) => {
  const request = axios.put(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const deleteBlog = (id, token) => {
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return request.then(response => response.data)
}

export default { getAll, createBlog, likeBlog, deleteBlog }