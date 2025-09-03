import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id === updated.id ? updated : a)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

export const fetchAnecdotes = () => async dispatch => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  dispatch(setAnecdotes(response.data))
}

export const createAnecdote = (content) => async dispatch => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post('http://localhost:3001/anecdotes', newAnecdote)
  dispatch(appendAnecdote(response.data))
}

export const voteAnecdote = (id) => async (dispatch, getState) => {
  const anecdote = getState().anecdotes.find(a => a.id === id)
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.patch(`http://localhost:3001/anecdotes/${id}`, updatedAnecdote)
  dispatch(updateAnecdote(response.data))
}

export default anecdoteSlice.reducer