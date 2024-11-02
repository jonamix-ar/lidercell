import React, { useEffect, useState } from 'react'
import {
  FiChevronDown,
  FiFilter,
  FiGrid,
  FiList,
  FiSliders
} from 'react-icons/fi'
import { getBrands } from '@app/services/brands'

const Filters = ({
  toggleView,
  setToggleView,
  onSortChange,
  onBrandChange,
  selectedBrand,
  setShowWholesale,
  showWholesale
}) => {
  const [dropdownSort, setDropdownSort] = useState(false)
  const [dropdownBrands, setDropdownBrands] = useState(false)
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await getBrands()

      setBrands(response.brands)
    }
    fetchBrands()
  }, [])

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Botón para alternar entre precios estándar y mayorista */}
        <div className="relative inline-flex align-middle">
          <button
            onClick={() => setShowWholesale(!showWholesale)}
            className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            {showWholesale
              ? 'Mostrar Precios Estándar'
              : 'Mostrar Precios Mayorista'}
          </button>
        </div>

        {/* Filtro de marcas */}
        <div className="relative inline-flex align-middle">
          <button
            onClick={() => setDropdownBrands(!dropdownBrands)}
            className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <FiFilter className="-ml-1 mr-2 h-4 w-4" />
            {selectedBrand !== 'all'
              ? brands.find((brand) => brand.id === selectedBrand)?.name ||
                'Marcas'
              : 'Marcas'}
            <FiChevronDown className="-mr-1 ml-2 h-4 w-4" />
          </button>

          {dropdownBrands && (
            <div className="z-50 absolute mt-10 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
              <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                <li>
                  <button
                    onClick={() => onBrandChange('all')}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Mostrar Todos
                  </button>
                </li>
                {brands.map((brand, index) => (
                  <li key={index}>
                    <button
                      onClick={() => onBrandChange(brand.id)}
                      className={`w-full px-3 py-2 text-left ${
                        brand.id === selectedBrand
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white'
                          : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                      }`}
                    >
                      {brand.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Botón de ordenación */}
        <div className="relative inline-flex align-middle">
          <button
            onClick={() => setDropdownSort(!dropdownSort)}
            className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <FiSliders className="-ml-1 mr-2 h-4 w-4" />
            Ordenar
            <span
              className={`ml-2 transform transition-transform duration-300 ${dropdownSort ? 'rotate-180' : 'rotate-0'}`}
            >
              <FiChevronDown className="h-4 w-4" />
            </span>
          </button>

          {dropdownSort && (
            <div className="z-50 absolute mt-10 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
              <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                {/* Opciones de ordenación */}
                <li>
                  <button
                    onClick={() => onSortChange('priceAsc')}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Menor Precio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSortChange('priceDesc')}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Mayor Precio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSortChange('nameAsc')}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    A-z
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSortChange('nameDesc')}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Z-a
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSortChange('bestSellers')}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Mas Vendidos
                  </button>
                </li>
                {/* Otras opciones... */}
              </ul>
            </div>
          )}
        </div>

        {/* Botón de vista en lista o cuadrícula */}
        <div className="relative inline-flex align-middle">
          <button
            onClick={() => setToggleView(!toggleView)}
            className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 transition-all duration-300"
          >
            {toggleView ? (
              <FiList className="h-4 w-4" />
            ) : (
              <FiGrid className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default Filters
