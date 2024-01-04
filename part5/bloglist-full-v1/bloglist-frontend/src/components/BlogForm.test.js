import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls event handler when wanting to create new blog', async () => {
  const createFn = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm onCreateClick={createFn}/>)

  // Get all inputs and type info
  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'My first blog')
  await user.type(inputs[1], 'John Doe')
  await user.type(inputs[2], 'http://www.test.com')

  // Click create
  const createBtn = screen.queryByText('create')
  await user.click(createBtn)

  // Confirm created content
  expect(createFn.mock.calls).toHaveLength(1)
  const eventObj = createFn.mock.calls[0][0]
  expect(eventObj).toBeDefined()

  const formData = eventObj.target.elements
  expect(formData.title.value).toBe('My first blog')
  expect(formData.author.value).toBe('John Doe')
  expect(formData.url.value).toBe('http://www.test.com')
})