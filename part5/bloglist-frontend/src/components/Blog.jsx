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
      <div style={blogStyle} className="blog">
        <span className="blog-title">{blog.title}</span> | <span className="blog-author">{blog.author}</span>{' '}
        <button onClick={toggleVisibility}>view</button>
        {visible && (
          <div className="blog-details">
            <div className="blog-url">{blog.url}</div>
            <div className="blog-likes">
              likes {blog.likes} <button onClick={handleLike}>like</button>
            </div>
            <div className="blog-user">{blog?.user?.name}</div>
          </div>
        )}
        {(currentUser?.username === blog?.user?.username ) && (<button onClick={handleDelete}>delete</button>)}
      </div>
    </>
  )
}

export default Blog
