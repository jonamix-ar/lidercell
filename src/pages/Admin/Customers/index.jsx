import React, { useState } from 'react'
import GeneralCard from '@app/components/Cards/GeneralCard'
import TableData from '@app/components/Tables/TableData'
import { FiPlus } from 'react-icons/fi'

const Customers = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fethData = async () => {
      try {
        const response = await getCustomers()
        setCustomers(response.data.customers)
      } catch (error) {
        console.error('Error al obtener los datos de configuración:', error)
      }
    }

    fethData()
  }, [])

  const columns = []

  return (
    <GeneralCard
      title="Clientes"
      className="pb-2"
      button={
        <Link
          to="/admin/customers/create"
          className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 "
        >
          <FiPlus /> Nuevo cliente
        </Link>
      }
    >
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <TableData data={categories} columns={columns} />
      </div>
    </GeneralCard>
  )
}

export default Customers
