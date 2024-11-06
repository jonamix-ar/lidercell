import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '@app/utils/money'
import { getDolar } from '@app/services/dolar'
import { formatStatusMobile } from '@app/utils/format'

const ProductCard = ({ product, showWholesale, list }) => {
  const [price, setPrice] = useState(0)
  const [priceWholesale, setPriceWholesale] = useState(0)
  const imgSrcPlaceholder = 'https://placehold.co/600x400'
  const imageBrands = `${import.meta.env.VITE_REACT_APP_BACKEND}`

  useEffect(() => {
    const fetchData = async () => {
      const dolarValue = await getDolar()
      const priceARS = product.price * (dolarValue.venta + 30)
      const priceWholesaleARS =
        product.price_wholesaler * (dolarValue.venta + 30)

      setPrice(priceARS)
      setPriceWholesale(priceWholesaleARS)
    }

    fetchData()
  }, [product, showWholesale])

  return (
    <div
      className={`${
        list
          ? 'flex items-center space-x-6 p-4 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800'
          : 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800'
      }`}
    >
      <div className={`${list ? 'w-24 h-24' : 'h-56'} w-full mb-4`}>
        <Link to={`/producto/${product.slug}`}>
          <div className="w-64 h-64 overflow-hidden">
            {' '}
            {/* Ajusta el tamaño según tus necesidades */}
            <img
              className="w-full h-full object-cover"
              src={
                product.picture
                  ? `${imageBrands}${product.picture}`
                  : imgSrcPlaceholder
              }
              alt={product.name}
              loading="lazy"
            />
          </div>
        </Link>
      </div>
      <div className={`pt-8 ${list ? 'flex-1' : 'text-center'}`}>
        <Link
          to={`/producto/${product.slug}`}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product.name}
        </Link>

        <div className="mt-4 flex items-center justify-center gap-4">
          <p className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            {formatStatusMobile(product.pre_owned)}
          </p>
          {product.color && (
            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              {product.color}
            </span>
          )}
          {product.storage && (
            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              {product.storage}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4"></div>

        {product.stock > 0 ? (
          <div
            className={`mt-4 flex ${
              list ? 'justify-between' : 'items-center justify-between gap-4'
            } transition-opacity duration-500 ease-in-out opacity-100`}
          >
            {showWholesale && product.show_price_wholesaler === 1 ? (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Precio Mayorista USD
                  </p>
                  <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    {money(product.price_wholesaler)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Precio Mayorista ARS
                  </p>
                  <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    {money(priceWholesale)}
                  </p>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-center gap-4">
            <p className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-700 dark:text-red-300">
              Agotado
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
