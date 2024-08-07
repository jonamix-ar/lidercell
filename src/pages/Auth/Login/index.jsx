import React from 'react'

import LogoLidercell from '../../../components/common/LogoLidercell'
import LoginForm from '../../../components/Form/LoginForm'

const Login = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        {/* Login Container */}
        <div
          className="flex border rounded-[30px] p-4 bg-white shadow-lg"
          style={{ width: 930 }}
        >
          {/* Left Box */}
          <div className="w-1/2 flex flex-col justify-center items-center bg-black rounded-[30px]">
            <div className="mb-4">
              <LogoLidercell
                color={'#fff'}
                colorSecondary={'transparent'}
                stroke={'#fff'}
                className={'w-full h-full'}
              />
            </div>
            <p className="text-white text-md">VENTAS POR MAYOR Y MENOR</p>
          </div>
          {/* Right Box */}
          <div className="w-1/2 p-12">
            <div className="flex flex-col items-center">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
