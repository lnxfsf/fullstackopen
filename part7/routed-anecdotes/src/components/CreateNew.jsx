import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import  { useField } from '../hooks'


const CreateNew = ({addNew, setNotification}) => {

  // const [content, setContent] = useState('')
  //const [author, setAuthor] = useState('')
  //const [info, setInfo] = useState('')

  const navigate = useNavigate();

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')



  const handleSubmit = (e) => {
    e.preventDefault()

    addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0
    })
    setNotification(`a new anecdote ${content.inputProps.value} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.inputProps} />
        </div>
        <div>
          author
          <input name='author' {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.inputProps} />
        </div>
        <div>
        <button>create</button>
          <button type="button" onClick={() => {
            content.reset()
            author.reset()
            info.reset()
          }}>reset</button>

        </div>
      </form>
    </div>
  )

}

export default CreateNew;