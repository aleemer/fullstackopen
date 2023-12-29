const dummy = (blogs) => {
  return 1
}

const indexOfMax = (array) => {
  if (array.length === 0) {
    return -1
  }

  let max = array[0]
  let maxIndex = 0

  for (let i = 0; i < array.length; i++) {
    if (array[i] >= max) {
      maxIndex = i
      max = array[i]
    }
  }
  return maxIndex
}

// Generates a map (obj) from an array of strings
const generateMap = (array) => {
  const map = {}

  array.forEach((val) => {
    if (map[val]) {
      map[val] = map[val] + 1
    } else {
      map[val] = 1
    }
  })
  return map
}

const sameObject= (a, b) => {
  // Object equality determined on all fields being the same
  const fields = Object.keys(a)
  fields.forEach((field) => {
    if (a[field] !== b[field]) {
      return false
    }
  })
  return true
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const indexMaxLikes = indexOfMax(blogs.map((blog) => blog.likes))
  return indexMaxLikes === -1 ? {} : blogs[indexMaxLikes]
}

const mostBlogs = (blogs) => {
  const blogMap = generateMap(blogs.map(blog => blog.author))
  const authorArray = Object.keys(blogMap)
  const countArray = Object.values(blogMap)
  const maxIndex = indexOfMax(countArray)
  return maxIndex === -1 ? { author: '', blogs: 0 } : { author: authorArray[maxIndex], blogs: countArray[maxIndex] }
}

module.exports = {
  dummy,
  sameObject,
  totalLikes,
  favouriteBlog,
  mostBlogs
}