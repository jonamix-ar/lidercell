import React, { useEffect, useState } from 'react'
import { money } from '@app/utils/money'
import { getSaleById } from '@app/services/sales'
import { paymentTypes } from '@app/utils/paymentTypes'
import Loading from '@app/components/common/Loading' // Ensure you have a Loading component

const SalesDetails = ({ saleId }) => {
  const [loading, setLoading] = useState(true) // Initialize as true
  const [sale, setSale] = useState({})

  useEffect(() => {
    const getSale = async () => {
      try {
        const response = await getSaleById(saleId)
        setSale(response.data.sale) // Default to empty object if sale is undefined
      } catch (error) {
        console.error('Error al obtener los detalles de la venta:', error)
      } finally {
        setLoading(false)
      }
    }
    if (saleId) {
      // Ensure saleId is present before making the request
      getSale()
    }
  }, [saleId])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // Extract yyyy-MM-dd part
  }

  const replacePaymentMethod = (payment_method) => {
    const paymentType = paymentTypes.find((type) => type.id === payment_method)
    return paymentType ? paymentType.name : 'Unknown'
  }

  const calculateTransactionPercentage = (totalCash, transactionPercentage) => {
    // Calcula el porcentaje de transacción
    return (totalCash * transactionPercentage) / 100
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      {/* Header Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Cliente(*):
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            value={sale.customer?.name || 'Sin cliente'} // Optional chaining to handle undefined
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Fecha:</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            value={formatDate(sale.date) || ''} // Default to empty string if date is undefined
            disabled
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Comprobante(*):
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            value={sale.receipts}
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Vendedor:
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            value={sale.user?.name || 'Sin vendedor'}
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Tipo de venta:
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            value={
              replacePaymentMethod(sale.payment_method) || 'Sin tipo de venta'
            }
            disabled
          />
        </div>
      </div>
      <table className="w-full table-auto border-collapse mb-4">
        <thead>
          <tr className="bg-blue-200 text-slate-700">
            <th className="border px-4 py-2" colSpan={2}>
              Artículo
            </th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Precio Venta</th>
            <th className="border px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {sale.SaleDetail.map((saleDetail) => (
            <tr key={saleDetail.id}>
              <td className="border px-4 py-2" colSpan={2}>
                {saleDetail.product.name} - {saleDetail.product.color} -{' '}
                {saleDetail.product.storage}
              </td>
              <td className="border px-4 py-2 text-end">{saleDetail.qty}</td>
              <td className="border px-4 py-2 text-end">
                {money(saleDetail.price)}
              </td>
              <td className="border px-4 py-2 text-end">
                {money(saleDetail.price * saleDetail.qty)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Monto total:{' '}
            <span className="font-normal">{money(sale.total) || '0.00'}</span>
          </label>
        </div>
      </div>

      {/* Header Section */}
      {sale.payment_method == 2 && (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Monto en dólares entregado:{' '}
                <span className="font-normal">
                  {money(sale.amount_paid_dolar) || '0.00'}
                </span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Monto restante en Pesos argentinos:{' '}
                <span className="font-normal">
                  {money(sale.amount_paid_ars) || '0.00'}
                </span>
              </label>
            </div>
          </div>
        </>
      )}

      {sale.payment_method == 3 && (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Porcentaje de la transacción:{' '}
                <span className="font-normal">
                  {calculateTransactionPercentage(
                    sale.total,
                    sale.amount_percent
                  ) + '%' || '0%'}
                </span>
              </label>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Monto total + porcentaje:{' '}
                  <span className="font-normal">
                    {money(sale.amount_paid_ars) || '0.00'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </>
      )}

      {sale.payment_method == 4 && (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Monto en pesos argentinos entregado:{' '}
                <span className="font-normal">
                  {money(sale.amount_paid_ars) || '0.00'}
                </span>
              </label>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SalesDetails
