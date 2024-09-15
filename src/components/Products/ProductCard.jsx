import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '@app/utils/money'
import { getDolar } from '@app/services/dolar'
import { formatStatusMobile } from '@app/utils/format'

const ProductCard = ({ product, showWholesale }) => {
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
  }, [product, showWholesale]) // Agregamos showWholesale como dependencia

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
      <div className="pt-6 text-center ">
        <Link
          href="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product.name}
        </Link>

        <div className="mt-4 flex items-center justify-center gap-4">
          <p className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            {formatStatusMobile(product.pre_owned)}
          </p>
        </div>

        {/* Mostrar precios en función de showWholesale */}
        {showWholesale ? (
          <div className="mt-4 flex items-center justify-between gap-4 transition-opacity duration-500 ease-in-out opacity-100">
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
        ) : (
          <>
            {product.show_price_wholesaler == 1 && (
              <div className="mt-4 flex items-center justify-between gap-4 transition-opacity duration-500 ease-in-out opacity-100">
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProductCard
