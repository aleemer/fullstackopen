const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithZeroBlog = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithManyBlogs = [
    { _id: '', title: '', author: '', url: '', likes: 5, __v: 0 },
    { _id: '', title: '', author: '', url: '', likes: 3, __v: 0 },
    { _id: '', title: '', author: '', url: '', likes: 7, __v: 0 }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithZeroBlog)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(15)
  })
})

describe('a favourite blog', () => {
  const listWithZeroBlog = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithManyBlogs = [
    { title: 'Random Title 1', author: 'John Doe', url: 'https://example.com/1', likes: 5 },
    { title: 'Random Title 2', author: 'Jane Smith', url: 'https://example.com/2', likes: 3 },
    { title: 'Random Title 3', author: 'Bob Johnson', url: 'https://example.com/3', likes: 7 }
  ]

  test('of empty list is empty', () => {
    const result = listHelper.favouriteBlog(listWithZeroBlog)
    expect(result).toEqual({})
  })

  test('of list with one blog is that blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('of list with many blogs', () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs)
    expect(result).toEqual(listWithManyBlogs[2])
  })
})

describe('the most blogs', () => {
  const listWithZeroBlog = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithManyBlogs = [
    { title: 'Random Title 1', author: 'John Doe', url: 'https://example.com/1', likes: 5 },
    { title: 'Random Title 2', author: 'Jane Smith', url: 'https://example.com/2', likes: 3 },
    { title: 'Random Title 3', author: 'Bob Johnson', url: 'https://example.com/3', likes: 7 },
    { title: 'Random Title 4', author: 'Jane Smith', url: 'https://example.com/3', likes: 2 }
  ]

  test('of empty list is empty', () => {
    const result = listHelper.mostBlogs(listWithZeroBlog)
    expect(result).toEqual({ author: '', blogs: 0 })
  })

  test('of list with one blog is that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('of list with many blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual({ author: 'Jane Smith', blogs: 2 })
  })
})

describe('the most likes', () => {
  const listWithZeroBlog = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithManyBlogs = [
    { title: 'Random Title 1', author: 'John Doe', url: 'https://example.com/1', likes: 5 },
    { title: 'Random Title 2', author: 'Jane Smith', url: 'https://example.com/2', likes: 3 },
    { title: 'Random Title 3', author: 'Bob Johnson', url: 'https://example.com/3', likes: 7 },
    { title: 'Random Title 4', author: 'Jane Smith', url: 'https://example.com/3', likes: 2 }
  ]

  test('of empty list is empty', () => {
    const result = listHelper.mostLikes(listWithZeroBlog)
    expect(result).toEqual({ author: '', likes: 0 })
  })

  test('of list with one blog is expected likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('of list with many blogs is sum of likes', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual({ author: 'Bob Johnson', likes: 7 })
  })
})