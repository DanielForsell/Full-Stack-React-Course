import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    title:'Component testing is done with react-testing-library',
    important: true
  }

//   screen.debug()

  render(<Note note={note} />)

  const element = screen.getByText('Title:Component testing is done with react-testing-library')
  expect(element).toBeDefined()

//   screen.debug(element)
})

test('clicking the button calls event handler once', async () => {
    const note = {
        title:'Component testing is done with react-testing-library',
        important: true
    }
  
    const mockHandler = vi.fn()
  
    render(
      <Note note={note} toggleImportance={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })


  test('renders title and author, but not url or likes by default', () => {
    const note = {
      title: 'Testing React components',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 5
    }
  
    render(<Note note={note} />)
  
    // Check that title and author are rendered
    expect(screen.getByText('Title:Testing React components')).toBeDefined()
    expect(screen.queryByText('John Doe')).toBeNull()
  
    // Check that url and likes are not rendered by default
    expect(screen.queryByText('http://example.com')).toBeNull()
    expect(screen.queryByText('likes 5')).toBeNull()
  })

  test('renders url, likes, and user when the button is clicked', async () => {
    const note = {
      title:'Testing React components',
      author:'John Doe',
      url:'http://example.com',
      votes:5,
      user: {
        name: 'Jane Doe'
      }
    }
  
    render(<Note note={note} />)
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
  
    // Check that url, likes, and user are rendered after clicking the button
    expect(screen.queryByText('URL:http://example.com')).toBeDefined()
    expect(screen.queryByText('Votes:5')).toBeDefined()
    expect(screen.queryByText('Author:Jane Doe')).toBeDefined()
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const note = {
      title: 'Testing React components',
      author: 'John Doe',
      url: 'http://example.com',
      likes: 5
    }
  
    const mockHandler = vi.fn()
  
    render(<Note note={note} likeNote={mockHandler} />)
  
    const user = userEvent.setup()
    const button1 = screen.getByText('view')
    await user.click(button1)
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })