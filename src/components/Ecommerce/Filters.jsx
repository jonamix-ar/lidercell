import React, { useState } from 'react'
import {
  FiArrowDown,
  FiChevronDown,
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiSliders
} from 'react-icons/fi'

const Filters = ({ toggleView, setToggleView }) => {
  const [dropdownSort, setDropdownSort] = useState(false)
  return (
    <>
      <div className="bg-gray-50 antialiased dark:bg-gray-900 p-6 rounded-lg shadow">
        <div className="items-center justify-between space-y-4 sm:flex sm:space-y-0">
          {/* Buscador */}
          <div className="w-1/2">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar por nombre,marca, categoría..."
                required
              />
            </div>
          </div>

          {/* Filtros de búsqueda Ampliada */}
          <div className="flex items-center space-x-4">
            <button
              data-modal-toggle="filterModal"
              data-modal-target="filterModal"
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
            >
              <FiFilter className="-ms-0.5 me-2 h-4 w-4" />
              Filters
              <FiChevronDown className="-me-0.5 ms-2 h-4 w-4" />
            </button>

            <div className="relative inline-flex align-middle w-full">
              <button
                id="sortDropdownButton1"
                onClick={() => setDropdownSort(!dropdownSort)}
                type="button"
                className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
              >
                <FiSliders className="-ms-0.5 me-2 h-4 w-4" />
                Sort
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
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        The most popular
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Newest
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Increasing price
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Decreasing price
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        No. reviews
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Discount %
                      </a>
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
        </div>
      </div>
    </>
  )
}

export default Filters
