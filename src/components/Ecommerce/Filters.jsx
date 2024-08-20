import React, { useEffect, useState } from 'react'
import {
  FiCheck,
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
  selectedBrand
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
      <div className="flex items-center space-x-4">
        <div className="relative inline-flex align-middle w-full">
          <button
            onClick={() => setDropdownBrands(!dropdownBrands)}
            type="button"
            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
          >
            <FiFilter className="-ms-0.5 me-2 h-4 w-4" />
            {selectedBrand !== 'all'
              ? brands.find((brand) => brand.id === selectedBrand)?.name ||
                'Marcas'
              : 'Marcas'}
            <FiChevronDown className="-me-0.5 ms-2 h-4 w-4" />
          </button>

          {dropdownBrands && (
            <div
              id="dropdownSort1"
              className="z-50 absolute mt-12 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
              data-popper-placement="bottom-start"
            >
              <ul
                className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                aria-labelledby="sortDropdownButton"
              >
                <li>
                  <button
                    type="button"
                    onClick={() => onBrandChange('all')}
                    className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Mostrar Todos
                  </button>
                </li>
                {brands.map((brand, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => onBrandChange(brand.id)}
                      className={`group inline-flex w-full items-center rounded-md px-3 py-2 text-sm ${
                        brand.id === selectedBrand
                          ? 'text-gray-900 bg-gray-100 dark:bg-gray-600 dark:text-white'
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
                      }`}
                    >
                      {brand.name}
                      {brand.id === selectedBrand && (
                        <FiCheck className="ms-2 h-4 w-4" /> // Aquí se muestra el icono de activo
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative inline-flex align-middle w-full">
          <button
            id="sortDropdownButton1"
            onClick={() => setDropdownSort(!dropdownSort)}
            type="button"
            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
          >
            <FiSliders className="-ms-0.5 me-2 h-4 w-4" />
            Ordenar
            <span
              className={`ms-2 transition-transform duration-300 transform ${dropdownSort ? 'rotate-180' : 'rotate-0'}`}
            >
              <FiChevronDown className="h-4 w-4 " />
            </span>
          </button>

          {dropdownSort && (
            <div
              id="dropdownSort1"
              className="z-50 absolute mt-12 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
              data-popper-placement="bottom-start"
            >
              <ul
                className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                aria-labelledby="sortDropdownButton"
              >
                <li>
                  <button
                    type="button"
                    onClick={() => onSortChange('priceAsc')}
                    className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Menor Precio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSortChange('priceDesc')}
                    className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Mayor Precio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSortChange('nameAsc')}
                    className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    A-Z
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSortChange('nameDesc')}
                    className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Z-A
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSortChange('bestSellers')}
                    className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Más Vendidos
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setToggleView(!toggleView)}
          className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto transition-all duration-300"
        >
          {toggleView ? (
            <FiList className="h-4 w-4 transition-all duration-300" />
          ) : (
            <FiGrid className="h-4 w-4 transition-all duration-300" />
          )}
        </button>
      </div>
    </>
  )
}

export default Filters
