import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routers'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { AuthProvider } from './contexts/AuthContext'
import Loading from './components/common/Loading'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  </React.StrictMode>
)
