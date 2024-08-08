import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBarcode } from 'react-icons/fa'
import {
  FiCalendar,
  FiCreditCard,
  FiList,
  FiPlus,
  FiTrash2,
  FiUser
} from 'react-icons/fi'
import GeneralCard from '@app/components/Cards/GeneralCard'
import { getProductsSearch } from '@app/services/products'
import { money, moneyArs } from '@app/utils/money'
import { getDolar } from '@app/services/dolar'
import { useAuth } from '@app/contexts/AuthContext'
import api from '@app/libs/api'
import { toast } from 'react-toastify'

const documentTypes = [
  { id: 1, name: 'Factura' },
  { id: 2, name: 'Remito' },
  { id: 3, name: 'Ticket' },
  { id: 6, name: 'Nota de Credito' }
]

const paymentTypes = [
  { id: 1, name: 'Dolares' },
  { id: 2, name: 'Dolares + Pesos ARS' },
  { id: 3, name: 'USDT/Crypto' }
]

const Sales = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const [dolar, setDolar] = useState({})
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(() => {
    // Retrieve selected products from localStorage when component mounts
    const storedProducts = localStorage.getItem('selectedProducts')
    return storedProducts ? JSON.parse(storedProducts) : []
  })
  const [paymentType, setPaymentType] = useState('')
  const [amountPaid, setAmountPaid] = useState('')
  const [amountInDollars, setAmountInDollars] = useState('')
  const [transactionPercentage, setTransactionPercentage] = useState(0)
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [selectedDocumentType, setSelectedDocumentType] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.length > 2) {
        // Fetch only if query is more than 2 characters
        try {
          const data = await getProductsSearch()
          console.log('Fetched products:', data) // Log the response data

          // Assuming data contains an array of products
          const filteredSuggestions = data.filter(
            (product) =>
              product.sku.toLowerCase().includes(query.toLowerCase()) ||
              product.name.toLowerCase().includes(query.toLowerCase())
          )
          setSuggestions(filteredSuggestions)
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      } else {
        setSuggestions([])
      }
    }

    fetchProducts()
  }, [query])

  useEffect(() => {
    const fetchDolar = async () => {
      try {
        const dolar = await getDolar()
        setDolar(dolar)
      } catch (error) {
        console.log(error)
      }
    }

    fetchDolar()
  }, [])

  const handleChange = (event) => {
    setSelectedDocumentType(event.target.value)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    // Add the quantity property with an initial value of 1
    const newSelectedProduct = { ...suggestion, quantity: 1 }
    const newSelectedProducts = [...selectedProducts, newSelectedProduct]
    setSelectedProducts(newSelectedProducts)
    setQuery('')
    setSuggestions([])
    setIsFocused(false)

    // Save selected products to localStorage
    localStorage.setItem(
      'selectedProducts',
      JSON.stringify(newSelectedProducts)
    )
  }

  const handleRemoveProduct = (index) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index)
    setSelectedProducts(updatedProducts)

    // Update localStorage
    localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts))
  }

  const handleClearAll = () => {
    // Clear the selected products state
    setSelectedProducts([])

    // Clear localStorage
    localStorage.removeItem('selectedProducts')
  }

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...selectedProducts]
    updatedProducts[index].quantity = parseInt(quantity, 10)
    setSelectedProducts(updatedProducts)

    localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts))
  }

  const totalCash = selectedProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)

  const handlePaymentTypeChange = (e) => {
    setPaymentType(parseInt(e.target.value, 10))
    setAmountPaid('')
    setAmountInDollars('')
  }

  const handleAmountPaidChange = (e) => {
    setAmountPaid(e.target.value)
  }

  const handleAmountInDollarsChange = (e) => {
    setAmountInDollars(e.target.value)
  }

  const calculateChange = () => {
    const amount = parseFloat(amountPaid)
    return !isNaN(amount) ? amount - totalCash : 0
  }

  const calculateRemainingAmount = () => {
    const amount = parseFloat(amountInDollars)
    if (!isNaN(amount) && dolar.venta) {
      const dollarVentaPlus30 = dolar.venta + 30
      const remainingAmount = totalCash - amount
      return remainingAmount * dollarVentaPlus30
    }
    return 0
  }

  const calculateTotalFinal = () => {
    // Asegúrate de que `totalCash` sea tu monto total inicial
    const baseTotal = totalCash

    // Calcula el porcentaje de transacción
    const transactionAmount = (baseTotal * transactionPercentage) / 100

    // Calcula el total final sumando el porcentaje al monto base
    return baseTotal + transactionAmount
  }

  const calculateTransactionPercentage = () => {
    // Calcula el porcentaje de transacción
    return (totalCash * transactionPercentage) / 100
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Armar el objeto con los datos de la venta
    const saleData = {
      date: saleDate,
      customer_id: 1,
      seller_id: user.id,
      receipt: selectedDocumentType,
      payment_method: paymentType.toString(), // Ensure payment_method is a string
      amount_paid_dolar:
        paymentType === 1
          ? parseFloat(amountPaid) || 0
          : paymentType === 2
            ? parseFloat(amountInDollars) || 0
            : 0, // Monto pagado en dólares si paymentType es 1
      amount_paid_ars: paymentType === 2 ? calculateRemainingAmount() || 0 : 0, // Monto pagado en ARS si paymentType es 2, sino calculamos el monto restante en dólares
      amount_percent: transactionPercentage,
      total: calculateTotalFinal() || 0
    }

    // Armar el objeto con los productos de la venta
    const saleProducts = selectedProducts.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: parseFloat(product.price), // Convert to number
      total: parseFloat(product.price) * product.quantity // Convert to number
    }))

    console.log('Sale Data:', saleData)
    console.log('Sale Products:', saleProducts)

    try {
      const response = await api.post('/sales', {
        sale: saleData,
        products: saleProducts
      })
      console.log('Response:', response.data)
      if (response.status === 200) {
        //localStorage.removeItem('selectedProducts')
        toast.success('Venta creada correctamente')
        navigate('/admin/sales')
      }
    } catch (error) {
      console.error('Error creating sale:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row gap-5.5 p-3">
        <div className="w-3/4">
          <GeneralCard title="Ventas" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="input-group-1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fecha(*):
                </label>
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FiCalendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="client-select"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cliente(*):
                </label>
                <div className="relative mb-2">
                  <div className="flex items-center w-full">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <FiUser className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar por nombre o ID de cliente..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-auto ms-1 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center space-x-2 px-2 py-2.5"
                    >
                      <FiPlus className="w-4 h-4" />
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
              <hr className="col-span-3" />
              <div className="col-span-3">
                <label htmlFor="search-products" className="sr-only">
                  Producto
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FaBarcode className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search-products"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Busca por código de barras o por nombre del producto..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                  />
                  {isFocused && suggestions.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg z-10">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.name} - {suggestion.sku} -{' '}
                          {suggestion.color}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="col-span-3">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3"></th>
                      <th scope="col" className="px-6 py-3">
                        Código
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Producto
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Cantidad
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Precio
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.map((product, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center gap-2 p-1 rounded-md bg-red-600 text-sm text-center font-medium text-white hover:bg-opacity-90"
                              onClick={() => handleRemoveProduct(index)}
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">{product.sku}</td>
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="1"
                            className="w-16 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                          />
                        </td>
                        <td className="px-6 py-4">{money(product.price)}</td>
                        <td className="px-6 py-4">
                          {money(product.price * product.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </GeneralCard>
        </div>

        <div className="w-1/4">
          <GeneralCard
            title={`Monto total ${money(totalCash)}`}
            className="p-4"
          >
            <div className="mb-3">
              <label
                htmlFor="input-group-1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Comprobante(*):
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FiList className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <select
                  id="document-type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedDocumentType}
                  onChange={handleChange}
                >
                  {documentTypes.map((documentType) => (
                    <option key={documentType.id} value={documentType.id}>
                      {documentType.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="input-group-1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo Pago(*):
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FiCreditCard className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <select
                  id="payment-type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-md"
                  value={paymentType}
                  onChange={handlePaymentTypeChange}
                >
                  <option value="">-- Seleccione --</option>
                  {paymentTypes.map((payment) => (
                    <option key={payment.id} value={payment.id}>
                      {payment.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {paymentType === 1 && (
              <>
                <div className="mt-4">
                  <label
                    htmlFor="amount-paid"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Dolares recibido
                  </label>
                  <input
                    type="number"
                    id="amount-paid"
                    value={amountPaid || ''}
                    onChange={handleAmountPaidChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ingrese el monto"
                  />
                </div>
                {amountPaid && (
                  <div className="mt-4">
                    <div className="mb-3 flex justify-between">
                      <span className="font-bold text-black">Vuelto</span>
                      <span className="text-black">
                        {money(calculateChange())}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            {paymentType === 2 && (
              <div className="col-span-1 mt-2">
                <label
                  htmlFor="amount-in-dollars"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  Dolares recibido:
                </label>
                <input
                  type="number"
                  id="amount-in-dollars"
                  value={amountInDollars || ''}
                  onChange={handleAmountInDollarsChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ingrese el monto"
                />
                <label
                  htmlFor="amount-in-pesos"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mb-2 mt-2"
                >
                  Monto en Pesos ARS: (Dolar blue + 30) = ${dolar.venta})
                </label>
                <input
                  type="number"
                  id="amount-remaining"
                  value={calculateRemainingAmount() || ''}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Monto restante"
                />
                {amountInDollars && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Restante: {moneyArs(calculateRemainingAmount())}
                    </p>
                  </div>
                )}
              </div>
            )}

            {paymentType === 3 && (
              <>
                <div className="mt-4">
                  <label
                    htmlFor="transaction-percentage"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Porcentaje de transacción
                  </label>
                  <input
                    type="number"
                    id="transaction-percentage"
                    value={transactionPercentage || ''}
                    onChange={(e) =>
                      setTransactionPercentage(parseFloat(e.target.value))
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Porcentaje de transacción"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="percentage-amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Monto del porcentaje
                  </label>
                  <input
                    type="number"
                    id="percentage-amount"
                    value={calculateTransactionPercentage()}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Monto del porcentaje"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="total-final"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Final
                  </label>
                  <input
                    type="number"
                    id="total-final"
                    value={calculateTotalFinal()}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Total Final"
                  />
                </div>
              </>
            )}
            <div>
              <button
                type="submit"
                className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!paymentType}
              >
                Realizar Venta
              </button>
              <button
                type="button"
                className="w-full mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleClearAll}
              >
                Cancelar
              </button>
            </div>
          </GeneralCard>
        </div>
      </div>
    </form>
  )
}

export default Sales
