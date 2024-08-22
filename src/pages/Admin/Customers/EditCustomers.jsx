import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import GeneralCard from '@app/components/Cards/GeneralCard'
import { getCustomerById, updateCustomer } from '@app/services/customers'
import { getStates, getLocalities } from '@app/services/settings'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify'

const EditCustomers = () => {
  const { id } = useParams()
  const navigate = useNavigate() // Hook para la navegación
  const [customer, setCustomer] = useState(null)
  const [states, setStates] = useState([])
  const [allLocalities, setAllLocalities] = useState([])
  const [stateId, setStateId] = useState('')
  const [localityId, setLocalityId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el cliente
        const response = await getCustomerById(id)
        const customerData = response.data.customer
        setCustomer(customerData)

        // Obtener estados y localidades
        const statesResponse = await getStates()
        setStates(statesResponse.data.states)

        const localitiesResponse = await getLocalities()
        setAllLocalities(localitiesResponse.data.localities)

        // Configurar estado y localidad del perfil del cliente
        const profile = customerData.profiles[0] || {}
        const profileStateId = profile.state_id || null
        console.log('🚀 ~ fetchData ~ profileStateId:', profileStateId)
        const profileLocalityId = profile.locality_id || null
        console.log('🚀 ~ fetchData ~ profileLocalityId:', profileLocalityId)

        // Configurar el estado y la localidad
        setStateId(profileStateId)
        setLocalityId(profileLocalityId)
      } catch (error) {
        console.error('Error al obtener los datos de configuración:', error)
      }
    }

    fetchData()
  }, [id])

  const filteredLocalities = allLocalities.filter(
    (locality) => parseInt(locality.state_id) === parseInt(stateId)
  )

  const handleSelectChange = (e) => {
    const { id, value } = e.target

    if (id === 'state_id') {
      setStateId(value)
      setLocalityId('') // Reinicia la localidad cuando cambias el estado
    } else if (id === 'city_id') {
      setLocalityId(value)
    }

    // Asegúrate de que los cambios en el select actualicen el estado del cliente
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Validate customer data
      if (!customer.name || !customer.email || !stateId || !localityId) {
        toast.error('Please fill out all required fields.')
        return
      }

      // Update the customer using the service
      const update = await updateCustomer(id, {
        name: customer.name,
        email: customer.email,
        document_type: customer.document_type,
        document_number: customer.document_number,
        phone: customer.phone,
        state_id: stateId,
        locality_id: localityId
      })

      console.log('Update successful:', update)

      // Notify the user about the success
      toast.success('Customer updated successfully')
      // Redirect to the customer list page
      // navigate('/admin/customers')
    } catch (error) {
      console.error('Error updating customer:', error)
      // Notify the user about the error
      toast.error('Error updating customer. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row gap-5.5 p-2">
        <div className="w-full">
          <GeneralCard title="Editar cliente" className="p-4">
            <div className="flex flex-col gap-5.5 pb-4">
              {/* Nombre y Correo electrónico */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={customer?.name || ''}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Correo electrónico
                </label>
                <input
                  type="text"
                  id="email"
                  value={customer?.email || ''}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5.5 pb-4">
              {/* Tipo de DNI y Nº de documento */}
              <div className="w-full md:w-1/4">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Tipo de DNI
                </label>
                <select
                  id="doc_type"
                  value={customer?.profiles[0]?.document_type || ''}
                  onChange={(e) =>
                    setCustomer({ ...customer, document_type: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary uppercase"
                >
                  {['dni', 'cuit-cuil', 'lc', 'le'].map((docType) => (
                    <option key={docType} value={docType}>
                      {docType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-3/4">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nº de documento
                </label>
                <input
                  type="text"
                  id="document_number"
                  value={customer?.profiles[0]?.document_number || ''}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      document_number: e.target.value
                    })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5.5 pb-4">
              {/* Teléfono */}
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  value={customer?.profiles[0]?.phone || ''}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5.5 pb-4">
              {/* Provincia y Ciudad */}
              <div className="w-full md:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Provincia
                </label>
                <select
                  id="state_id"
                  value={stateId}
                  onChange={handleSelectChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary uppercase"
                >
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ciudad
                </label>
                <select
                  id="city_id"
                  value={localityId}
                  onChange={handleSelectChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary uppercase"
                >
                  {filteredLocalities.map((locality) => (
                    <option key={locality.id} value={locality.id}>
                      {locality.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 xl:gap-4 pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
              >
                <span>
                  <FiSave />
                </span>
                <span>Guardar</span>
              </button>

              <Link
                to="/admin/customers"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
              >
                <span>
                  <FiArrowLeft />
                </span>
                <span>Volver</span>
              </Link>
            </div>
          </GeneralCard>
        </div>
      </div>
    </form>
  )
}

export default EditCustomers