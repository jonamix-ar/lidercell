import { createContext, useContext, useState } from 'react'
import axios from '../libs/axios'

const AuthContent = createContext({
  user: null,
  token: null,
  setUser: () => {},
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )
  const [token, _setToken] = useState(localStorage.getItem('token') || null)

  // Set user and token to local storage
  const setUser = (user, token) => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
    _setUser(user)
    _setToken(token)
  }

  return (
    <AuthContent.Provider value={{ user, token, setUser }}>
      {children}
    </AuthContent.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContent)
}
