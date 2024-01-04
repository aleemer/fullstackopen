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