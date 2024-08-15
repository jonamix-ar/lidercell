import React from 'react'
import Navigation from '@app/components/Home/Navigation'
import Ecommerce from '@app/components/Ecommerce'

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="container max-w-screen-xl mx-auto p-4">
        <Ecommerce />
      </div>
    </>
  )
}

export default Home
