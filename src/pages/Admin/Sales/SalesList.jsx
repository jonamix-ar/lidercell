import React, { useEffect, useState } from 'react'
import GeneralCard from '@app/components/Cards/GeneralCard'
import TableData from '@app/components/Tables/TableData'
import Modal from '@app/components/Modals/Modal'
import SalesDetails from './SalesDetails'
import { FiEye, FiPlus, FiTrash } from 'react-icons/fi'
import { getSales, getSaleById } from '@app/services/sales'
import { Link } from 'react-router-dom'
import { FaFilePdf } from 'react-icons/fa'
import { paymentTypes } from '@app/utils/paymentTypes'
import { money } from '@app/utils/money'
import { generatePDF } from '@app/utils/generatePDF'
import moment from 'moment'
import "moment/locale/es"

const SalesList = () => {
  const [sales, setSales] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSaleId, setSelectedSaleId] = useState(null)

  const openModal = (id) => {
    setSelectedSaleId(id) // Set the selected sale ID
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setSelectedSaleId(null) // Reset the selected sale ID when closing the modal
    setIsModalOpen(false)
  }

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await getSales()
        setSales(response.data.sales)
      } catch {
        console.error('Error al obtener los datos de ventas:', error)
      }
    }

    fetchSales()
  }, [])

  const replacePaymentMethod = (payment_method) => {
    const paymentType = paymentTypes.find((type) => type.id === payment_method)
    return paymentType ? paymentType.name : 'Unknown'
  }

  const columns = [
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: (info) => (
        <div className="flex justify-start gap-1">
          <button
            onClick={() => openModal(info.row.original.id)}
            className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-blue-500 text-sm text-center font-medium text-white hover:bg-opacity-90"
          >
            <FiEye />
          </button>
          <button className="cursor-pointer inline-flex items-center justify-center gap-2 p-2 rounded-md bg-red-500 text-sm text-center font-medium text-white hover:bg-opacity-90">
            <FiTrash />
          </button>
          <button
            onClick={() => handleGeneratePDF(info.row.original.id)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90"
          >
            <FaFilePdf />
          </button>
        </div>
      ),
      size: 5,
      enableResizing: true
    },
    {
      id: 'date',
      accessorKey: 'date',
      header: 'Fecha',
      cell: (info) => info.row.original.date
    },
    {
      id: 'customer',
      accessorKey: 'customer',
      header: 'Cliente',
      cell: (info) => info.row.original.customer.name
    },
    {
      id: 'seller',
      accessorKey: 'seller',
      header: 'Vendedor',
      cell: (info) => info.row.original.user.name
    },
    {
      id: 'receipt',
      accessorKey: 'receipt',
      header: 'Comprobante',
      cell: (info) => info.row.original.receipts
    },
    {
      id: 'saleType',
      accessorKey: 'saleType',
      header: 'Tipo de venta',
      cell: (info) => replacePaymentMethod(info.row.original.payment_method)
    },
    {
      id: 'total',
      accessorKey: 'total',
      header: 'Total',
      cell: (info) => `${money(info.row.original.total)}`
    }
  ]

  const handleGeneratePDF = async (id) => {
    const sale = await getSaleById(id)
    generatePDF(sale.data.sale)
  }

  return (
    <GeneralCard
      title="Ventas Registradas"
      className="pb-2"
      button={
        <div className="flex justify-end gap-2">
          <Link
            to="/admin/sales/new"
            className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90"
          >
            <FiPlus /> Nueva venta
          </Link>
        </div>
      }
    >
      <div className="relative overflow-x-auto sm:rounded-lg">
        <TableData data={sales} columns={columns} />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Vista de venta">
        <SalesDetails saleId={selectedSaleId} />
        {/* You can pass any content here */}
      </Modal>
    </GeneralCard>
  )
}

export default SalesList
