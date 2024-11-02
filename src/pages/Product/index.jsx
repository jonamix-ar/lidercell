import React from 'react'
import Navigation from '@app/components/Home/Navigation'
import Ecommerce from '@app/components/Ecommerce'
import ProductDetail from '../../components/Products/ProductDetail'

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="container max-w-screen-xl mx-auto p-4">
        <ProductDetail />
      </div>
    </>
  )
}

export default Home
