import { FiDollarSign, FiLayers, FiShoppingCart } from 'react-icons/fi'
import { useAuth } from '@app/contexts/AuthContext'
import StatsCard from '@app/components/Cards/StatsCard'
import GeneralCard from '@app/components/Cards/GeneralCard'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-wrap -mx-3">
        <StatsCard
          title={`Productos Registrados`}
          color={`border-blue-600`}
          value={1000000}
          icon={
            <FiLayers className="text-lg relative w-10 h-10 dark:text-white" />
          }
        />

        <StatsCard
          title={`Valor total del stock`}
          color={`border-slate-600`}
          value={1000000}
          isAmount={true}
          icon={
            <FiDollarSign className="text-lg relative w-10 h-10 dark:text-white" />
          }
        />

        <StatsCard
          title={`Ventas Realizadas`}
          color={`border-green-600`}
          value={1000000}
          icon={
            <FiShoppingCart className="text-lg relative w-10 h-10 dark:text-white" />
          }
        />

        <StatsCard
          title={`Ganancias del mes`}
          color={`border-sky-600`}
          value={1000000}
          isAmount={true}
          icon={
            <FiShoppingCart className="text-lg relative w-10 h-10 dark:text-white" />
          }
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-6">
          <GeneralCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
