import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ErrorPage from './ErrorPage'
import { NotificationProvider, useNotification } from './NotificationContext'

const queryClient = new QueryClient()

const Anecdotes = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/anecdotes')
      if (!response.ok) throw new Error('Server error')
      return response.json()
    }
  })

  const voteMutation = useMutation({
    mutationFn: async (anecdote) => {
      const updated = { ...anecdote, votes: anecdote.votes + 1 }
      const response = await fetch(`http://localhost:3001/anecdotes/${anecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      })
      if (!response.ok) throw new Error('Server error')
      return response.json()
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(['anecdotes'], (old = []) => old.map(a => a.id === updated.id ? updated : a))
      showNotification(`you voted '${updated.content}'`)
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <ErrorPage error={error} />

  return (
    <>
      {data.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes} <button onClick={() => voteMutation.mutate(anecdote)}>vote</button></div>
        </div>
      ))}
    </>
  )
}

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <div>
          <h3>Anecdote app</h3>
          <Notification />
          <AnecdoteForm />
          <Anecdotes />
        </div>
      </NotificationProvider>
    </QueryClientProvider>
  )
}

export default App
