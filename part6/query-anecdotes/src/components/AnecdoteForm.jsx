import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: async (content) => {
      const response = await fetch('http://localhost:3001/anecdotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 })
      })
      if (!response.ok) {
        let message = 'Server error'
        try {
          const data = await response.json()
          if (data && data.error) message = data.error
        } catch (e) {
          // ignore json parse errors and use default message
        }
        throw new Error(message)
      }
      return response.json()
    },
    onSuccess: (savedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (old = []) => [...old, savedAnecdote])
      showNotification(`anecdote '${savedAnecdote.content}' created`)
    },
    onError: (error) => {
      showNotification(error.message)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
