import React, { useEffect, useState } from 'react'
import GeneralCard from '@app/components/Cards/GeneralCard'
import TableData from '@app/components/Tables/TableData'
import Badge from '@app/components/UI/Badge'
import { Link, useNavigate } from 'react-router-dom'
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi'
import { FaFileExport, FaFileImport } from 'react-icons/fa6'
import { money } from '@app/utils/money'
import { getDolar } from '@app/services/dolar'
import { getProducts, deleteProduct } from '@app/services/products'
import { toast } from 'react-toastify'

const Products = () => {
  const [products, setProducts] = useState([])
  const [dolar, setDolar] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        setProducts(response.data.products)
        const dolar = await getDolar()
        setDolar(dolar)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      const resp = await deleteProduct(id)
      if (resp.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        )

        toast.success('Producto eliminado exitosamente', {
          position: 'bottom-right',
          autoClose: 5000
        })
        navigate('/admin/products')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error(error.response.data.message)
        toast.error('No autorizado. Inicie sesión nuevamente.', {
          position: 'bottom-right',
          autoClose: 5000
        })
      } else {
        toast.error('Error al eliminar el producto.', {
          position: 'bottom-right',
          autoClose: 5000
        })
      }
    }
  }

  const handleDeleteClick = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
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
      id: 'category',
      accessorKey: 'category',
      header: 'Cate./ Marca',
      cell: (info) => (
        <>
          <Badge type="primary" className="text-xs mr-1">
            {info.row.original.category.name}
          </Badge>
          <Badge type="secondary" className="text-xs">
            {info.row.original.brand.name}
          </Badge>
        </>
      )
    },
    {
      id: 'product-name',
      accessorFn: (row) => row.name,
      accessorKey: 'product_name',
      header: 'Producto',
      cell: (info) => (
        <div className="flex items-center justify-between">
          <span>{info.row.original.name}</span>
          {info.row.original.pre_owned === 1 && (
            <Badge type="primary" className="text-[8px]">
              SEMINUEVO
            </Badge>
          )}
        </div>
      )
    },
    {
      id: 'price-usd',
      accessorKey: 'price_usd',
      header: 'Precio USD/USDT',
      cell: (info) => money(info.row.original.price)
    },
    {
      id: 'price-ars',
      accessorKey: 'price_ars',
      header: 'Precio ARS',
      cell: (info) => money(info.row.original.price * (dolar.venta + 30))
    },
    {
      id: 'price-wholesaler',
      accessorKey: 'price_wholesaler',
      header: 'Precio mayorista USD/USDT',
      cell: (info) =>
        money(
          info.row.original.show_price_wholesaler
            ? info.row.original.price_wholesaler
            : '-'
        )
    },
    {
      id: 'price-wholesaler-ars',
      accessorKey: 'price_wholesaler_ars',
      header: 'Precio mayorista ARS',
      cell: (info) =>
        money(
          info.row.original.show_price_wholesaler
            ? info.row.original.price_wholesaler * (dolar.venta + 30)
            : '-'
        )
    },
    {
      id: 'qty',
      accessorKey: 'qty',
      header: 'Cant. Unid.',
      cell: (info) => info.row.original.qty
    },
    {
      id: 'stock',
      accessorKey: 'stock',
      header: 'Estado',
      cell: (info) => {
        if (info.row.original.qty === 0) {
          return (
            <Badge type="danger" className="text-xs">
              Agotado
            </Badge>
          )
        }
        return (
          <Badge type="success" className="text-xs">
            Disponible
          </Badge>
        )
      }
    },
    {
      id: 'actions',
      accessorKey: 'id',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex justify-end gap-2">
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
      size: 5
    }
  ]

  return (
    <GeneralCard
      title="Listado de Productos"
      className="pb-2"
      button={
        <div className="flex justify-end gap-2">
          <Link className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 ">
            <FaFileExport /> Export Productos
          </Link>
          <Link className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 ">
            <FaFileImport /> Importar Productos
          </Link>
          <Link
            to="/admin/products/create"
            className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90 "
          >
            <FiPlus /> Crear Producto
          </Link>
        </div>
      }
    >
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <TableData data={products} columns={columns} />
      </div>
    </GeneralCard>
  )
}

export default Products
