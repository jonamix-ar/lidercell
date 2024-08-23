import React, { useEffect, useState } from 'react'
import GeneralCard from '@app/components/Cards/GeneralCard'
import TableData from '@app/components/Tables/TableData'
import { FiEdit, FiPenTool, FiPlus, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getCustomers } from '@app/services/customers'

const Customers = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fethData = async () => {
      try {
        const response = await getCustomers()
        console.log('🚀 ~ fethData ~ response:', response)
        setCustomers(response.data.customers)
      } catch (error) {
        console.error('Error al obtener los datos de configuración:', error)
      }
    }

    fethData()
  }, [])

  const columns = [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => info.row.original.id,
      size: 5
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Cliente',
      accessorFn: (row) => row.name,
      cell: (info) => info.getValue()
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Correo electrónico',
      accessorFn: (row) => row.email,
      cell: (info) => info.getValue()
    },
    {
      id: 'phone',
      accessorKey: 'phone',
      header: 'Telefóno',
      accessorFn: (row) => row.phone,
      cell: (info) => {
        console.log('🚀 ~ info:', info)
        return info.row.original.profiles[0].phone || '-'
      }
    },
    {
      id: 'Provincia',
      accessorKey: 'states',
      header: 'Provincia',
      accessorFn: (row) => row.profiles[0].state.name,
      cell: (info) => info.row.original.profiles[0].state.name || '-'
    },
    {
      id: 'Ciudad',
      accessorKey: 'city',
      header: 'Ciudad',
      accessorFn: (row) => row.profiles[0].locality.name || '-',
      cell: (info) => info.row.original.profiles[0].locality.name || '-'
    },
    {
      id: 'actions',
      header: 'Acciones',
      accessorKey: 'actions',
      cell: (info) => (
        <>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/customers/${info.row.original.id}`}
              className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 "
            >
              <FiEdit />
            </Link>
            <button
              onClick={() => handleDeleteClick(info.row.original.id)}
              className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-red-500 text-sm text-center font-medium text-white hover:bg-opacity-90 "
            >
              <FiTrash />
            </button>
          </div>
        </>
      )
    }
  ]

  const handleDeleteClick = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      handleDelete(id)
    }
  }

  const handleDelete = async (id) => {
    try {
      const resp = await deleteCustomer(id)
      if (resp.status === 200) {
        setCustomers(customers.filter((customer) => customer.id !== id))
        toast.success('Cliente eliminado exitosamente', {
          position: 'bottom-right',
          autoClose: 5000
        })
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error(error.response.data.message)
        toast.error('No autorizado. Inicie sesión nuevamente.', {
          position: 'bottom-right',
          autoClose: 5000
        })
      } else {
        toast.error('Error al eliminar el cliente.', {
          position: 'bottom-right',
          autoClose: 5000
        })
      }
    }
  }

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
        <TableData data={customers} columns={columns} />
      </div>
    </GeneralCard>
  )
}

export default Customers
