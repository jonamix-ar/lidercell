// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'

// Redirigir automáticamente
window.location.href = 'https://lidercell.com.ar'

// Si deseas detener aquí el renderizado de React
// puedes eliminar todo lo siguiente si no es necesario

import { RouterProvider } from 'react-router-dom'
import router from './routers'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { AuthProvider } from './contexts/AuthContext'
import Loading from './components/common/Loading'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
