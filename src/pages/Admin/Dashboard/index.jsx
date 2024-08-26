import { useEffect, useState } from 'react'
import {
  FiDollarSign,
  FiGlobe,
  FiLayers,
  FiShoppingCart,
  FiTrash
} from 'react-icons/fi'
import StatsCard from '@app/components/Cards/StatsCard'
import GeneralCard from '@app/components/Cards/GeneralCard'
import { getStatisticsDashboard } from '@app/services/statistics'
import { getMonthName } from '@app/utils/months'
import { FaGlobe, FaMedal, FaRibbon, FaUsers } from 'react-icons/fa'
import SimpleCard from '../../../components/Cards/SimpleCard'
import { FaBagShopping } from 'react-icons/fa6'
import { money } from '../../../utils/money'

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    products: 0,
    stockValue: 0,
    sales: 0,
    customers: 0,
    lowStock: [],
    salesToday: 0,
    salesWeek: 0,
    salesMonth: 0,
    topProducts: [] // Inicializa topProducts como un array vacío
  })
  const imgSrcPlaceholder = 'https://placehold.co/600x400'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatisticsDashboard()
        console.log('🚀 ~ file: index.jsx:fetchData ~ response:', response)
        setStatistics(response)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(error.response.data.message)
        }
      }
    }

    fetchData()
  }, [])

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-wrap -mx-3">
        <StatsCard
          title="Productos Registrados"
          color="border-blue-600"
          value={statistics.products || 0}
          icon={
            <FiLayers className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
          }
        />

        <StatsCard
          title="Valor total del stock"
          color="border-slate-600"
          value={statistics.stockValue || 0}
          isAmount={true}
          icon={
            <FiDollarSign className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
          }
        />

        <StatsCard
          title="Ventas Realizadas"
          color="border-green-600"
          value={statistics.sales || 0}
          icon={
            <FiShoppingCart className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
          }
        />

        <StatsCard
          title="Clientes"
          color="border-sky-600"
          value={statistics.customers || 0}
          isAmount={false}
          icon={
            <FaUsers className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
          }
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-9">
          <GeneralCard
            title="Artículos mas vendidos"
            className="h-[300px] overflow-auto p-4"
          >
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200 text-slate-800">
                <tr>
                  <th className="px-4 py-2 text-left">Artículo</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Cantidad</th>
                  <th className="px-4 py-2 text-left">Ventas</th>
                </tr>
              </thead>
              <tbody>
                {statistics.topProducts && statistics.topProducts.length > 0 ? (
                  statistics.topProducts.map((item, index) => {
                    const product = item.product
                    return (
                      <tr
                        key={index}
                        className="border-b hover:bg-gray-100 transition-colors"
                      >
                        <td className="px-4 py-2 flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={
                                product.picture
                                  ? `${import.meta.env.VITE_REACT_APP_BACKEND}${product.picture}`
                                  : imgSrcPlaceholder
                              }
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800">
                              {product.name}
                            </p>
                            <p className="text-sm text-slate-800">
                              {product.color} - {product.storage}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-slate-800">
                          {product.qty}
                        </td>
                        <td className="px-4 py-2 text-slate-800">
                          {item.totalQty}
                        </td>
                        <td className="px-4 py-2 text-slate-800">
                          {money(item.totalQty * product.price)}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-slate-800">
                      No hay datos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </GeneralCard>
        </div>

        <div className="col-span-12 xl:col-span-3 flex flex-col gap-7.5">
          {/* Tarjeta 1 */}
          <div className="flex-1">
            <SimpleCard
              title="Ventas hoy"
              icon={
                <FaGlobe className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
              }
            >
              {money(statistics.salesToday) || 0}
            </SimpleCard>
          </div>

          <div className="flex-1">
            <SimpleCard
              title="Ventas de la semana"
              icon={
                <FaBagShopping className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
              }
            >
              {money(statistics.salesWeek) || 0}
            </SimpleCard>
          </div>

          <div className="flex-1">
            <SimpleCard
              title="Ventas del mes"
              icon={
                <FaMedal className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
              }
            >
              {money(statistics.salesMonth) || 0}
            </SimpleCard>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-6">
          <GeneralCard
            title={`Existen ${
              statistics.lowStock && statistics.lowStock.length > 0
                ? statistics.lowStock.length
                : 0
            } productos con stock bajo:`}
            className="h-[300px] overflow-auto p-4"
          >
            {statistics.lowStock && statistics.lowStock.length > 0 ? (
              <div className="overflow-auto">
                <ul className="list-none space-y-2">
                  {statistics.lowStock.map((product, index) => (
                    <li
                      key={index}
                      className="text-sm p-2 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{product.name}</span>
                        <span className="text-gray-600">
                          {product.qty} unidades
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No hay productos con stock bajo.
              </div>
            )}
          </GeneralCard>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <GeneralCard
            title="Top clientes"
            className="h-[300px] overflow-auto p-4"
          >
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 border-b text-left">#</th>
                  <th className="px-4 py-2 border-b text-left">Nombre</th>
                  <th className="px-4 py-2 border-b text-left">Email</th>
                  <th className="px-4 py-2 border-b text-left">
                    Cantidad de compras
                  </th>
                </tr>
              </thead>
              <tbody>
                {statistics.sortedTopBuyers &&
                statistics.sortedTopBuyers.length > 0 ? (
                  statistics.sortedTopBuyers.map((buyer, index) => (
                    <tr
                      key={buyer.id}
                      className="border-b hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                      <td className="px-4 py-2 text-gray-800">{buyer.name}</td>
                      <td className="px-4 py-2 text-gray-800">{buyer.email}</td>
                      <td className="px-4 py-2 text-gray-800">
                        {buyer.salesCount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-800">
                      No hay datos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </GeneralCard>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
