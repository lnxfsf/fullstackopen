import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdoteHandler = (event) => {
    event.preventDefault()
    const content = event.target.elements[0].value
    dispatch(addAnecdote(content))
    event.target.reset()
  }

  return (
    <form onSubmit={addAnecdoteHandler}>
      <h2>Create new</h2>
      <div><input /></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
