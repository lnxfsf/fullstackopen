import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: { username: 'testuser', name: 'Test User', id: '123' },
    id: '1',
  }

  test('renders blog\'s title and author, but not url or likes by default', () => {
    render(<Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} currentUser={{ username: 'testuser' }} />)
    expect(screen.getByText(blog.title)).toBeInTheDocument()
    expect(screen.getByText(blog.author)).toBeInTheDocument()
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
    expect(screen.queryByText(/likes/)).not.toBeInTheDocument()
  })

  test('shows blog\'s URL and likes after clicking the view button', async () => {
    render(<Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} currentUser={{ username: 'testuser' }} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(/likes 7/)).toBeInTheDocument()
  })

  test('calls event handler twice when like button is clicked twice', async () => {
    const updateBlogMock = vi.fn()
    render(<Blog blog={blog} updateBlog={updateBlogMock} deleteBlog={() => {}} currentUser={{ username: 'testuser' }} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(updateBlogMock).toHaveBeenCalledTimes(2)
  })
})
