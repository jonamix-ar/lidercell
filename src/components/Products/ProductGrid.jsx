import React from 'react'
import ProductCard from '@app/components/Products/ProductCard'

const ProductGrid = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )
}

export default ProductGrid
