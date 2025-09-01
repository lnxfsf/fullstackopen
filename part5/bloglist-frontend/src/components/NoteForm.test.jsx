import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'

describe('NoteForm', () => {
  test('calls event handler with correct details when a new blog is created', async () => {
    const createNoteMock = vi.fn()
    render(<NoteForm createNote={createNoteMock} />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/title/i), 'Test Blog')
    await user.type(screen.getByLabelText(/author/i), 'Test Author')
    await user.type(screen.getByLabelText(/url/i), 'http://testurl.com')
    await user.click(screen.getByRole('button', { name: /create/i }))
    expect(createNoteMock).toHaveBeenCalledTimes(1)
    expect(createNoteMock).toHaveBeenCalledWith({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com',
    })
  })
})