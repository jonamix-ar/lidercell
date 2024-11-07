import React from 'react'
import LogoLidercell from '@app/components/common/LogoLidercell'
import LoginForm from '@app/components/Form/LoginForm'
import { ToastContainer } from 'react-toastify'

const Login = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen px-4">
        {/* Login Container */}
        <div
          className="flex flex-col md:flex-row border rounded-[30px] p-4 bg-white shadow-lg max-w-3xl mx-auto"
          style={{ width: '100%', maxWidth: '930px' }}
        >
          {/* Left Box */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-black rounded-[30px] p-6 md:p-4">
            <div className="mb-4">
              <LogoLidercell
                color={'#fff'}
                colorSecondary={'transparent'}
                stroke={'#fff'}
                className={'w-full h-full'} // Adjusted size for mobile
              />
            </div>
            <p className="text-white text-md text-center md:text-left">
              VENTAS POR MAYOR Y MENOR
            </p>
          </div>
          {/* Right Box */}
          <div className="w-full md:w-1/2 p-6 md:p-12">
            <div className="flex flex-col items-center">
              
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
