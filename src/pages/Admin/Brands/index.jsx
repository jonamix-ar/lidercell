import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '@app/libs/axios'
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi'
import GeneralCard from '@app/components/Cards/GeneralCard'
import TableData from '@app/components/Tables/TableData'
import Badge from '@app/components/UI/Badge'
import { toast } from 'react-toastify'
import { deleteBrand } from '@app/services/brands'

const Brands = () => {
  const [brands, setBrands] = useState([])
  const imgSrcPlaceholder = 'https://placehold.co/600x400'
  const imageBrands = `${import.meta.env.VITE_REACT_APP_BACKEND}`

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('/brands')
        setBrands(response.data.brands)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBrands()
  }, [setBrands])

  const handleDelete = async (id) => {
    try {
      const resp = await deleteBrand(id)
      if (resp.status === 200) {
        setBrands(brands.filter((brand) => brand.id !== id))
        toast.success('Marca eliminada exitosamente', {
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
        toast.error('Error al eliminar la marca.', {
          position: 'bottom-right',
          autoClose: 5000
        })
      }
    }
  }

  const handleDeleteClick = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta marca?')) {
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
      id: 'brand',
      accessorKey: 'brand',
      header: 'Marca',
      cell: (info) => info.row.original.name
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Descripción',
      cell: (info) => info.row.original.description
    },
    {
      id: 'picture',
      accessorKey: 'picture',
      header: 'Imagen',
      cell: (info) => {
        return (
          <img
            src={
              info.row.original.picture
                ? `${imageBrands}${info.row.original.picture}`
                : imgSrcPlaceholder
            }
            alt={info.row.original.name}
            className="w-10 h-10 object-cover rounded-full"
          />
        )
      }
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Estado',
      cell: (info) => {
        if (info.row.original.status == 1) {
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
      }
    },
    {
      id: 'actions',
      header: 'Acciones',
      accessorKey: 'actions',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/brands/${info.row.original.id}`}
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
    <GeneralCard
      title="Marcas"
      className="pb-2"
      button={
        <Link
          to="/admin/brands/create"
          className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 "
        >
          <FiPlus /> Crear Marca
        </Link>
      }
    >
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <TableData data={brands} columns={columns} />
      </div>
    </GeneralCard>
  )
}

export default Brands
