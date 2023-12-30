const dummy = (blogs) => {
  return 1
}

// Returns true if the array is unique, works for primitive values
const uniqueArraySimple = (array) => {
  return (new Set(array)).size === array.length
}

// Returns true if the array is unique, works for objects
const uniqueArrayComplex = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (sameObject(array[i], array[j])) {
        return false
      }
    }
  }
  return true
}

// Returns true if two arrays are equivalent (same values, same order), works for primitive values
const sameArraySimple = (a, b) => {
  // Must be the same size
  if (a.length !== b.length) {
    return false
  }

  const iterLength = a.length
  for (let i = 0; i < iterLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true
}

// Returns true if two arrays are equivalent (same values, same order), works for objects
const sameArrayComplex = (a, b) => {
  // Must be the same size
  if (a.length !== b.length) {
    return false
  }

  const iterLength = a.length
  for (let i = 0; i < iterLength; i++) {
    if (!sameObject(a[i], b[i])) {
      return false
    }
  }
  return true
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

// Generates a map of blogs in the form, author:count
const generateBlogMap = (blogs) => {
  const map = {}

  blogs.forEach((val) => {
    if (map[val]) {
      map[val] = map[val] + 1
    } else {
      map[val] = 1
    }
  })
  return map
}

// Generate a map of blogs in the form, author:totalLikes
const generateLikesMap = (blogs) => {
  const map = {}

  const authors = blogs.map(blog => blog.author)
  for (const author of authors) {
    const authorBlogs = blogs.filter(blog => blog.author === author)
    const authorLikes = totalLikes(authorBlogs)
    map[author] = authorLikes
  }
  return map
}

const sameObject = (a, b) => {
  // Object equality determined on all fields being the same
  const fieldsA = Object.keys(a)
  const fieldsB = Object.keys(b)
  
  if (fieldsA.length !== fieldsB.length) {
    return false
  }

  for (const field of fieldsA) {
    if (a[field] !== b[field]) {
      return false
    }
  }
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
  const blogMap = generateBlogMap(blogs.map(blog => blog.author))
  const authorArray = Object.keys(blogMap)
  const countArray = Object.values(blogMap)
  const maxIndex = indexOfMax(countArray)
  return maxIndex === -1 ? { author: '', blogs: 0 } : { author: authorArray[maxIndex], blogs: countArray[maxIndex] }
}

const mostLikes = (blogs) => {
  const likesMap = generateLikesMap(blogs)
  const authorArray = Object.keys(likesMap)
  const likesArray = Object.values(likesMap)
  const maxIndex = indexOfMax(likesArray)
  return maxIndex === -1 ? { author: '', likes: 0 } : { author: authorArray[maxIndex], likes: likesArray[maxIndex] }
}

module.exports = {
  dummy,
  uniqueArraySimple,
  uniqueArrayComplex,
  sameArraySimple,
  sameArrayComplex,
  sameObject,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}