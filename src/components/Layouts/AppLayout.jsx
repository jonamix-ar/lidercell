import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from '../../libs/axios'
import { useAuth } from '../../contexts/AuthContext'
import Navigation from '../Partials/Navigation'
import Sidebar from '../Partials/Sidebar'
import { ToastContainer } from 'react-toastify'

const AppLayout = () => {
  const { user, setUser } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const resp = await axios.get('/user')
  //       if (resp.status === 200) {
  //         setUser(resp.data.data)
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.status === 401) {
  //         localStorage.removeItem('user')
  //         window.location.href = '/login'
  //       }
  //     }
  //   }

  //   // Only fetch user if not already set
  //   if (!user) {
  //     fetchUser()
  //   }
  // }, [user, setUser])

  // if user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <div className="dark:bg-slate-800 dark:text-slate-200">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Navigation
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AppLayout
