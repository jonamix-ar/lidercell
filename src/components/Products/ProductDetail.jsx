import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../services/api'
import { getDolar } from '../../services/dolar'
import { money, moneyArs } from '../../utils/money'
import Seo from '../common/Seo'

const ProductDetail = () => {
  const { slug } = useParams() // Obtiene el slug desde la URL
  const [product, setProduct] = useState(null)
  const [price, setPrice] = useState(0)
  const [priceWholesale, setPriceWholesale] = useState(0)
  const imgSrcPlaceholder = 'https://placehold.co/600x400'
  const imageBrands = `${import.meta.env.VITE_REACT_APP_BACKEND}`

  useEffect(() => {
    // Simula una llamada a la API para obtener el producto por su slug
    const fetchProductBySlug = async () => {
      try {
        const response = await getProducts(slug) // Ajusta la ruta de tu API
        setProduct(response.product)

        const dolarValue = await getDolar()
        const priceARS = response.product.price * (dolarValue.venta + 30)
        const priceWholesaleARS =
          response.product.price_wholesaler * (dolarValue.venta + 30)

        setPrice(priceARS)
        setPriceWholesale(priceWholesaleARS)
      } catch (error) {
        console.error('Error al obtener el producto:', error)
      }
    }

    fetchProductBySlug()
  }, [slug])

  if (!product) {
    return <p>Cargando producto...</p>
  }

  return (
    <>
      <Seo
        title={product.name}
        description={`Compra ${product.name} al mejor precio. ${product.description}`}
        keywords={`${product.name}, comprar ${product.name}, precio de ${product.name}, tienda de móviles`}
        image={
          product.picture
            ? `${imageBrands}${product.picture}`
            : imgSrcPlaceholder
        }
        url={`${imageBrands + '/' + product.slug}`}
      />
      <section
        class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        key={product.id}
      >
        <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                src={
                  product.picture
                    ? `${imageBrands}${product.picture}`
                    : imgSrcPlaceholder
                }
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div class="mt-6 sm:mt-8 lg:mt-0">
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product.name}
              </h1>
              <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  Dolares: {`${money(product.price)}`}
                </p>

                <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  Pesos Arg: {`${moneyArs(price)}`}
                </p>
              </div>

              <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  href="#"
                  title=""
                  class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button"
                >
                  <svg
                    class="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  Add to favorites
                </a>

                <a
                  href="#"
                  title=""
                  class="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center"
                  role="button"
                >
                  <svg
                    class="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Comprar
                </a>
              </div>

              <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p class="mb-6 text-gray-500 dark:text-gray-400">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetail
