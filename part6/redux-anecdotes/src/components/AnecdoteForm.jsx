import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addAnecdote(content))
    dispatch(setNotification(`You added: "${content}"`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={add}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
