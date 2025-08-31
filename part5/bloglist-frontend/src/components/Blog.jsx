import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    await updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      await deleteBlog(blog.id)
    }
  }

  return (
    <>
      <div style={blogStyle}>
        {blog.title} | {blog.author}{' '}
        <button onClick={toggleVisibility}>view</button>
        <div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog?.user?.name}</div>
        </div>
        {(currentUser?.username === blog?.user?.username ) && (<button onClick={handleDelete}>delete</button>)}
      </div>
    </>
  )
}

export default Blog
