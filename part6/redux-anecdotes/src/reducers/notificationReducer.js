import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to Better Anecdotes!',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, seconds) => dispatch => {
  dispatch(setNotification(message))
  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
}

export default notificationSlice.reducer