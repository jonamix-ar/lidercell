import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProducts } from '../../services/api'
import { getDolar } from '../../services/dolar'
import { money, moneyArs } from '../../utils/money'
import Seo from '../common/Seo'
import { Heart, ShoppingCart, Truck, Shield, ArrowLeft } from 'lucide-react'
import WhatsAppContactButton from '../common/WhatsAppContactButton'

const ProductDetail = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [price, setPrice] = useState(0)
  const [priceWholesale, setPriceWholesale] = useState(0)
  const [loading, setLoading] = useState(true)
  const imgSrcPlaceholder = 'https://placehold.co/600x400'
  const imageBrands = `${import.meta.env.VITE_REACT_APP_BACKEND}`

  useEffect(() => {
    const fetchProductBySlug = async () => {
      try {
        setLoading(true)
        const response = await getProducts(slug)
        setProduct(response.product)

        const dolarValue = await getDolar()
        const priceARS = response.product.price * (dolarValue.venta + 30)
        const priceWholesaleARS =
          response.product.price_wholesaler * (dolarValue.venta + 30)

        setPrice(priceARS)
        setPriceWholesale(priceWholesaleARS)
      } catch (error) {
        console.error('Error al obtener el producto:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductBySlug()
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-semibold mb-4">Producto no encontrado</p>
        <a href="/" className="text-blue-500 hover:underline flex items-center">
          <ArrowLeft className="mr-2" />
          Volver a la página principal
        </a>
      </div>
    )
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
      <section className="py-12 bg-white dark:bg-gray-900 shadow rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src={
                    product.picture
                      ? `${imageBrands}${product.picture}`
                      : imgSrcPlaceholder
                  }
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {/* Add more images here if available */}
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900 dark:text-white">{`${money(product.price)} USD`}</p>
                <p className="mt-1 text-xl text-gray-500 dark:text-gray-400">{`${moneyArs(price)} ARS`}</p>
              </div>

              {product.show_price_wholesaler === 1 && (
                <div className="mt-3">
                  <h3 className="text-sm text-gray-600 dark:text-gray-400">
                    Precio mayorista:
                  </h3>
                  <p className="mt-1 text-xl text-gray-900 dark:text-white">{`${money(product.price_wholesaler)} USD`}</p>
                  <p className="mt-1 text-lg text-gray-500 dark:text-gray-400">{`${moneyArs(priceWholesale)} ARS`}</p>
                </div>
              )}

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="text-base text-gray-700 dark:text-gray-300 space-y-6">
                  {product.description}
                </div>
              </div>

              {/* <div className="mt-8 flex flex-col space-y-4">
                <button className="flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Agregar al carrito
                </button>
                <button className="flex-1 bg-gray-200 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <Heart className="mr-2 h-5 w-5" />
                  Agregar a favoritos
                </button>
              </div> */}

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Atributos
                </h3>
                <div className="mt-4 prose prose-sm text-gray-500 dark:text-gray-400">
                  <ul role="list">
                    <li>Color: {product.color}</li>
                    <li>Almacenamiento: {product.storage}</li>
                  </ul>
                </div>
              </div>

              {/* <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Información de envío
                </h3>
                <div className="mt-4 flex items-center">
                  <Truck className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    Free shipping on orders over $100
                  </p>
                </div>
              </div> */}

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Garantía
                </h3>
                <div className="mt-4 flex items-center">
                  <Shield className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <Link to={'/warranty'} className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                   Ingresar para ver la garantía
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WhatsAppContactButton />
    </>
  )
}

export default ProductDetail
