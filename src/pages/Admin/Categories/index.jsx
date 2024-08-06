import React, { useEffect, useState } from 'react'
import axios from '@app/libs/axios'
import GeneralCard from '@app/components/Cards/GeneralCard'
import TableData from '@app/components/Tables/TableData'
import Badge from '@app/components/UI/Badge'
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get('/categories')
        if (resp.status === 200) {
          setCategories(resp.data.data)
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(error.response.data.message)
        }
      }
    }
    fetchData()
  }, [setCategories])

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(`/categories/${id}/delete`)
      if (resp.status === 200) {
        setCategories(categories.filter((category) => category.id !== id))
        toast.success('Categoría eliminada exitosamente', {
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
        toast.error('Error al eliminar la categoría.', {
          position: 'bottom-right',
          autoClose: 5000
        })
      }
    }
  }

  const handleDeleteClick = (id) => {
    if (
      window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')
    ) {
      handleDelete(id)
    }
  }

  const columns = [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => info.row.original.id,
      size: 5
    },
    {
      id: 'categories',
      accessorKey: 'categories',
      header: 'Categorías',
      cell: (info) => {
        console.log(info)
        return info.row.original.name
      }
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Descripción',
      cell: (info) => {
        return info.row.original.description
      }
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Estatus',
      cell: (info) => {
        if (info.row.original.status === 1) {
          return (
            <Badge type="success" className="text-[12px]">
              Activo
            </Badge>
          )
        } else {
          return (
            <Badge type="danger" className="text-[12px]">
              Inactivo
            </Badge>
          )
        }
      },
      size: 50
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/categories/${info.row.original.id}`}
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

  return (
    <>
      <GeneralCard
        title="Categorías"
        className="pb-2"
        button={
          <Link
            to="/admin/categories/create"
            className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 "
          >
            <FiPlus /> Crear Categoría
          </Link>
        }
      >
        <div className="relative overflow-x-auto  sm:rounded-lg">
          <TableData data={categories} columns={columns} />
        </div>
      </GeneralCard>
    </>
  )
}

export default Categories
