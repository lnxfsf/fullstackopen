import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return null
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [message, dispatch] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={{ message, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification must be used within NotificationProvider')
  const { dispatch } = context
  const showNotification = (text) => {
    dispatch({ type: 'SHOW', payload: text })
    setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
  }
  return { ...context, showNotification }
}

export default NotificationContext


