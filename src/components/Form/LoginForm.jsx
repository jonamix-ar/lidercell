import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from '../../libs/axios'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser, csrfToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = e.target.elements
    const body = {
      email: email.value,
      password: password.value
    }
    await csrfToken()

    try {
      const resp = await axios.post('/login', body)
      if (resp.status === 200) {
        setUser(resp.data.user)
        navigate('/admin/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message, {
          icon: true,
          position: 'top-right'
        })
      } else {
        toast.error('An unexpected error occurred. Please try again later.', {
          icon: true,
          position: 'top-right'
        })
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="header-text mb-4">
          <h2 className="font-bold text-2xl">HOLA, OTRA VEZ 👋</h2>
          <p>Estamos felices de tenerte de regreso.</p>
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Correo electrónico"
            aria-label="Correo electrónico"
            required
            autoComplete="email"
            autoFocus
          />
        </div>
        <div className="mb-1">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Contraseña"
            aria-label="Password"
            required
            autoComplete="current-password"
          />
        </div>
        <div className="mb-5 mt-3 flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="remember"
              className="form-check-input"
            />
            <label className="ml-2" htmlFor="rememberMe">
              Recuérdame
            </label>
          </div>
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-800 text-white text-lg rounded-lg"
          >
            Ingresar
          </button>
        </div>
        <div className="mb-3">
          <button className="w-full p-3 bg-gray-100 hover:bg-gray-50 text-lg rounded-lg flex items-center justify-center">
            <FaGoogle className="mr-2" /> Inicia sesión con Google
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
