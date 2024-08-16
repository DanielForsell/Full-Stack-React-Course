import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createNote = vi.fn()

  render(<NoteForm createNote={createNote} />)

  const input = screen.getByPlaceholderText('author')
  const sendButton = screen.getByText('Create')

    

  await user.type(input, 'testing a form...')
    // screen.debug()

  await user.click(sendButton)

  console.log(createNote.mock.calls[0][0])

  expect(createNote).toHaveBeenCalledWith({
    author: 'testing a form...',
    title: '',
      url: '',
      votes: '',
      important: true
  })
  expect(createNote).toHaveBeenCalledTimes(1)

})


test('form calls the callback function with correct data when a new blog is created', async () => {
  const createNote = vi.fn()

  render(<NoteForm createNote={createNote} />)

  const user = userEvent.setup()

  // Fill out the form
  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  await user.type(titleInput, 'New Blog Title')
  await user.type(authorInput, 'New Blog Author')
  await user.type(urlInput, 'http://newblog.com')

  // Submit the form
  const submitButton = screen.getByText('Create')
  await user.click(submitButton)

  // Check that the callback function was called with the correct data
  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0]).toEqual({
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'http://newblog.com',
    votes: '',
    important: true
  })

})