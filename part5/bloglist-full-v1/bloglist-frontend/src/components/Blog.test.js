import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('only render title and author by default', () => {
  const blog = {
    title: 'This is a blog',
    author: 'Ron Jeffries',
    url: 'http://www.test.com',
    likes: 2
  }

  render(<Blog blog={blog}/>)

  // Expect title and author to be defined
  const title = screen.queryByText(/This is a blog/)
  const author = screen.queryByText(/Ron Jeffries/)
  expect(title).toBeInTheDocument()
  expect(author).toBeInTheDocument()

  // Expect likes and url to not be defined
  const likes = screen.queryByText(`likes ${blog.likes}`)
  const url = screen.queryByText(`${blog.url}`)
  expect(likes).not.toBeInTheDocument()
  expect(url).not.toBeInTheDocument()
})

test('blog URL and number of likes now visible that button clicked', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'This is a blog',
    author: 'Ron Jeffries',
    url: 'http://www.test.com',
    user: {
      name: 'John Doe',
      username: 'J'
    },
    likes: 2
  }

  render(<Blog blog={blog} user={blog.user}/>)

  // Show details
  const button = screen.queryByText('show')
  await user.click(button)

  // Expect likes and url to be defined
  const likes = screen.queryByText(`likes ${blog.likes}`)
  const url = screen.queryByText(`${blog.url}`)
  expect(likes).toBeInTheDocument()
  expect(url).toBeInTheDocument()
})

test('like button clicked twice means two fn calls made', async () => {
  const likeFn = jest.fn()
  const user = userEvent.setup()
  const blog = {
    title: 'This is a blog',
    author: 'Ron Jeffries',
    url: 'http://www.test.com',
    user: {
      name: 'John Doe',
      username: 'J'
    },
    likes: 2
  }

  render(<Blog blog={blog} user={blog.user} onLikeClick={likeFn}/>)

  // Show like button
  const button = screen.queryByText('show')
  await user.click(button)

  // Click like button twice
  const likeButton = screen.queryByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  // Has two calls
  expect(likeFn.mock.calls).toHaveLength(2)
})