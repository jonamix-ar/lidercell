import { useEffect, useState } from 'react'
import { FiDollarSign, FiLayers, FiShoppingCart } from 'react-icons/fi'
import StatsCard from '@app/components/Cards/StatsCard'
import GeneralCard from '@app/components/Cards/GeneralCard'
import { getStatisticsDashboard } from '@app/services/statistics'
import { getMonthName } from '@app/utils/months'

const Dashboard = () => {
  const [statistics, setStatistics] = useState({})

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
          title={`Productos Registrados`}
          color={`border-blue-600`}
          value={statistics.products || 0}
          icon={
            <FiLayers className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
          }
        />

        <StatsCard
          title={`Valor total del stock`}
          color={`border-slate-600`}
          value={statistics.stockValue || 0}
          isAmount={true}
          icon={
            <FiDollarSign className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
          }
        />

        <StatsCard
          title={`Ventas Realizadas`}
          color={`border-green-600`}
          value={statistics.sales || 0}
          icon={
            <FiShoppingCart className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
          }
        />

        <StatsCard
          title={`Ganancias del mes ${getMonthName(new Date().getMonth() + 1)}`}
          color={`border-sky-600`}
          value={statistics.salesMonth || 0}
          isAmount={true}
          icon={
            <FiShoppingCart className="text-lg relative w-10 h-10 text-slate-700 dark:text-white" />
          }
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-6">
          <GeneralCard
            title={`Existen ${
              statistics.lowStock && statistics.lowStock.length > 0
                ? statistics.lowStock.length
                : 0
            } productos con stock bajo:`}
            className="h-[300px] overflow-auto"
          >
            {statistics.lowStock && statistics.lowStock.length > 0 ? (
              <div className="overflow-auto p-4">
                <ul className="list-disc list-inside">
                  {statistics.lowStock.map((product, index) => (
                    <li key={index} className='text-sm '>
                      {product.name} - {product.qty} unidades
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <li>No hay productos con stock bajo.</li>
            )}
          </GeneralCard>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
