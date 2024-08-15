import React from 'react'
import ProductCard from '@app/components/Products/ProductCard'

const ProductGrid = ({ products, totalPages }) => {
  return (
    <>
      {totalPages}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )
}

export default ProductGrid
