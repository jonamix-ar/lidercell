import React, { useEffect, useState } from 'react'
import Loading from '@app/components/common/Loading'
import ProductGrid from '@app/components/Products/ProductGrid'
import ProductList from '@app/components/Products/ProductList'
import Filters from './Filters'
import Pagination from '@app/components/common/Pagination'
import { getProductsWithPaginationSort } from '@app/services/products'
import { FiSearch } from 'react-icons/fi'
import Seo from '@app/components/common/Seo'
import { useLocation } from 'react-router-dom'

const Ecommerce = () => {
  const [toggleView, setToggleView] = useState(true)
  const [showWholesale, setShowWholesale] = useState(false)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(15) // number of items per page
  const [totalPages, setTotalPages] = useState(0)
  const [sortType, setSortType] = useState('default') // Controla el orden
  const [searchTerm, setSearchTerm] = useState('') // Controla el término de búsqueda
  const [brand, setBrand] = useState('all') // Controla el filtro por categoría
  const location = useLocation()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const data = await getProductsWithPaginationSort({
        currentPage,
        itemsPerPage,
        sortType,
        search: searchTerm, // Asegúrate de que `search` sea el término de búsqueda
        brand
      })

      if (data) {
        setProducts(data.products)
        setTotalPages(data.totalPages)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [currentPage, itemsPerPage, sortType, searchTerm, brand])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleSortChange = (newSortType) => {
    setSortType(newSortType)
    setCurrentPage(1) // Reinicia la paginación cuando cambie el orden
  }

  const handleBrandChange = (newBrand) => {
    setBrand(Number(newBrand)) // Asegúrate de que `brand` sea un número
    setCurrentPage(1) // Reinicia la paginación cuando cambie la categoría
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reinicia a la primera página en cada nueva búsqueda
  }

  return (
    <>
      <Seo
        title="Catálogo de productos - Lidercell"
        description="Explora nuestro catálogo de productos con los mejores precios y ofertas. Compra teléfonos, accesorios y más."
        keywords="comprar teléfonos, catálogo de móviles, accesorios, mejores precios, tienda online"
        image="https://yourwebsite.com/static/default-image.jpg"
        url={`${import.meta.env.VITE_REACT_APP_BACKEND_API + "\/" + location.pathname}`}
      />
      <section className=" py-8  md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="bg-gray-50 antialiased dark:bg-gray-900 p-6 rounded-lg shadow">
            <div className="items-center justify-between space-y-4 sm:flex sm:space-y-0">
              {/* Buscador */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar por nombre,marca, categoría..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <Filters
                toggleView={toggleView}
                setToggleView={setToggleView}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
                onBrandChange={handleBrandChange}
                selectedBrand={brand}
                setShowWholesale={setShowWholesale}
                showWholesale={showWholesale}
              />
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {loading ? (
            <Loading />
          ) : toggleView ? (
            <div className="mb-4 mt-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
              <ProductGrid
                products={products}
                totalPages={totalPages}
                showWholesale={showWholesale}
              />
            </div>
          ) : (
            <div className="mb-4 mt-4 flex flex-col gap-4">
              <ProductList
                products={products}
                totalPages={totalPages}
                showWholesale={showWholesale}
              />
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  )
}

export default Ecommerce
