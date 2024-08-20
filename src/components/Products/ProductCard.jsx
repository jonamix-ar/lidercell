import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '@app/utils/money'
import { getDolar } from '@app/services/dolar'

const ProductCard = ({ product }) => {
  const [price, setPrice] = useState(0)
  const imgSrcPlaceholder = 'https://placehold.co/600x400'
  const imageBrands = `${import.meta.env.VITE_REACT_APP_BACKEND}`

  useEffect(() => {
    const fetchData = async () => {
      const dolarValue = await getDolar()
      setPrice(product.price * (dolarValue.venta + 30))
    }

    fetchData()
  }, [])

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <Link href="#">
          <img
            className="mx-auto h-full dark:block"
            src={
              product.picture
                ? `${imageBrands}${product.picture}`
                : imgSrcPlaceholder
            }
            alt={product.name}
          />
        </Link>
      </div>
      <div className="pt-6  text-center ">
        <Link
          href="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product.name}
        </Link>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Precio USD
            </p>
            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              {money(product.price)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Precio ARS
            </p>
            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              {money(price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
