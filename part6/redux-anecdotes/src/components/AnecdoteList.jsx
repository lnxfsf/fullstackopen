import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase()
    return [...state.anecdotes]
      .filter(a => a.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted: "${content}"`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
