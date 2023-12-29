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

const sameBlog = (a, b) => {
  // Blog equality determined on all fields being the same
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

module.exports = {
  dummy,
  sameBlog,
  totalLikes,
  favouriteBlog
}