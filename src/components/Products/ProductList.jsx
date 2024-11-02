import React from 'react'
import ProductCard from '@app/components/Products/ProductCard'

const ProductList = ({ products, showWholesale }) => {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showWholesale={showWholesale} list />
      ))}
    </>
  )
}

export default ProductList