import React, { useEffect, useState } from 'react'
import GeneralCard from '@app/components/Cards/GeneralCard'
import TableData from '@app/components/Tables/TableData'
import { FiEdit, FiEye, FiPlus, FiPrinter, FiTrash } from 'react-icons/fi'
import { getSales } from '@app/services/sales'
import { Link } from 'react-router-dom'
import { FaFilePdf } from 'react-icons/fa'

const SalesList = () => {
  const [sales, setSales] = useState([])

  useEffect(() => {
    const fetchSales = async () => {
      const response = await getSales()
      setSales(response.data.sales)
    }

    fetchSales()
  }, [])

  const columns = [
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex justify-end gap-1">
          <button className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-blue-500 text-sm text-center font-medium text-white hover:bg-opacity-90 ">
            <FiEye />
          </button>
          <Link
            to={`/admin/sales/${info.row.original.id}`}
            className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-yellow-500 text-sm text-center font-medium text-white hover:bg-opacity-90 "
          >
            <FiEdit />
          </Link>
          <button className="cursor-pointer inline-flex items-center justify-center gap-2 p-2 rounded-md bg-red-500 text-sm text-center font-medium text-white hover:bg-opacity-90 ">
            <FiTrash />
          </button>
          <buton className="cursor-pointer inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 ">
            <FaFilePdf />
          </buton>
          <button className="cursor-pointer inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 ">
            <FiPrinter />
          </button>
        </div>
      ),
      size: 10
    },
    {
      id: 'date',
      accessorKey: 'date',
      header: 'Fecha',
      cell: (info) => new Date(info.getValue()).toLocaleDateString()
    },
    {
      id: 'cutomer',
      accessorKey: 'cutomer',
      header: 'Cliente',
      cell: (info) => {
        console.log(info)
        return `${info.row.original.customer.name}`
      }
    }
  ]

  return (
    <GeneralCard
      title="Ventas Registradas"
      className="pb-2"
      button={
        <div className="flex justify-end gap-2">
          <Link
            to="/admin/sales/new"
            className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 "
          >
            <FiPlus /> Nueva venta
          </Link>
        </div>
      }
    >
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <TableData data={sales} columns={columns} />
      </div>
    </GeneralCard>
  )
}

export default SalesList
