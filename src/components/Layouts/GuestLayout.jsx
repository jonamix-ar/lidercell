import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const GuestLayout = () => {
  const { user } = useAuth()

  // Use a flag to determine if redirection should occur
  if (user) {
    return <Navigate to="/admin/dashboard" />
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Outlet />
      </div>
    </>
  )
}

export default GuestLayout
