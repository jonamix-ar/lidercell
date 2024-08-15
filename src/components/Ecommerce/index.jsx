import React, { useEffect, useState } from 'react'
import Loading from '@app/components/common/Loading'
import ProductGrid from '@app/components/Products/ProductGrid'
import Filters from './Filters'
import Pagination from '@app/components/common/Pagination'
import { getProductsWithPagination } from '@app/services/products'

const Ecommerce = () => {
  const [toggleView, setToggleView] = useState(true)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // number of items per page
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const data = await getProductsWithPagination({
        currentPage,
        itemsPerPage
      })

      if (data) {
        setProducts(data.products)
        setTotalPages(data.totalPages)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [currentPage, itemsPerPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className=" py-8  md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Filtros de búsqueda */}
        <Filters toggleView={toggleView} setToggleView={setToggleView} />

        {toggleView ? (
          loading ? (
            <Loading />
          ) : (
            <>
              {' '}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <div className="mb-4 mt-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                <ProductGrid products={products} totalPages={totalPages} />
              </div>
            </>
          )
        ) : (
          <div className="mb-4 mt-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            List
          </div>
        )}
      </div>
    </section>
  )
}

export default Ecommerce
