import React, { useEffect, useState } from 'react'
import GeneralCard from '@app/components/Cards/GeneralCard'
import TableData from '@app/components/Tables/TableData'
import Badge from '@app/components/UI/Badge'
import { getUsers } from '@app/services/users'
import { Link } from 'react-router-dom'
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers()
        setUsers(response.data.users)
      } catch (error) {
        console.error('Error al obtener los datos de configuración:', error)
      }
    }

    fetchData()
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
      id: 'users',
      accessorKey: 'users',
      header: 'Usuarios',
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
      id: 'role',
      accessorKey: 'role',
      header: 'Rol',
      accessorFn: (row) => row.role,
      cell: (info) => info.getValue()
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Estado',
      accessorFn: (row) => row.status,
      cell: (info) => {
        if (info.row.original.status === 0) {
          return (
            <Badge type="danger" className="text-xs">
              Inactivo
            </Badge>
          )
        }
        return (
          <Badge type="success" className="text-xs">
            Activo
          </Badge>
        )
      }
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: () => <div className="text-center">Acciones</div>,
      cell: (info) => (
        <div className="flex justify-center gap-2">
          <Link
            to={`/admin/products/${info.row.original.id}`}
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
      ),
      size: 50
    }
  ]

  const handleDeleteClick = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      handleDelete(id)
    }
  }

  const handleDelete = async (id) => {
    try {
      const resp = await deleteUser(id)
      if (resp.status === 200) {
        setUsers(users.filter((user) => user.id !== id))
        toast.success('Usuario eliminado exitosamente', {
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
        toast.error('Error al eliminar el usuario.', {
          position: 'bottom-right',
          autoClose: 5000
        })
      }
    }
  }

  return (
    <GeneralCard
      title={`Usuarios`}
      className="pb-2"
      button={
        <Link
          to="/admin/users/create"
          className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 "
        >
          <FiPlus /> Nuevo Usuario
        </Link>
      }
    >
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <TableData data={users} columns={columns} />
      </div>
    </GeneralCard>
  )
}

export default Users
