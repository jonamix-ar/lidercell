import React from 'react'
import Navigation from '@app/components/Home/Navigation'
import Ecommerce from '@app/components/Ecommerce'
import WhatsAppContactButton from '../../components/common/WhatsAppContactButton'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="container max-w-screen-xl mx-auto p-4">
        <Ecommerce />
        <WhatsAppContactButton />
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
