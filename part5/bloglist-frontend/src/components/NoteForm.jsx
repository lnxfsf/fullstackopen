import { useState } from 'react'


const NoteForm = ({ createNote }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const newNote = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    createNote(newBlog)
  }

  return (
    <form onSubmit={newNote}>
      <div>
        <label htmlFor="title">title:</label>
        <input value={title} onChange={({ target }) => setTitle(target.value)} type="text" name="title" id="title" />
      </div>
      <div>
        <div>
          <label htmlFor="author">author:</label>
          <input value={author} onChange={({ target }) => setAuthor(target.value)} type="text" name="author" id="author" />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} name="url" id="url" />
        </div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default NoteForm
