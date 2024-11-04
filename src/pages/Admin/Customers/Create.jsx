import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GeneralCard from '@app/components/Cards/GeneralCard'
import { createCustomer } from '@app/services/customers'
import { getStates, getLocalities } from '@app/services/settings'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify'

const CreateCustomer = () => {
  const navigate = useNavigate()
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    profiles: [{ document_type: '', document_number: '', phone: '' }]
  })
  const [states, setStates] = useState([])
  const [allLocalities, setAllLocalities] = useState([])
  const [stateId, setStateId] = useState('')
  const [localityId, setLocalityId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statesResponse = await getStates()
        setStates(statesResponse.data.states)

        const localitiesResponse = await getLocalities()
        setAllLocalities(localitiesResponse.data.localities)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const filteredLocalities = allLocalities.filter(
    (locality) => parseInt(locality.state_id) === parseInt(stateId)
  )

  const handleSelectChange = (e) => {
    const { id, value } = e.target

    if (id === 'state_id') {
      setStateId(value)
      setLocalityId('')
    } else if (id === 'city_id') {
      setLocalityId(value)
    }
  }

  const handleProfileChange = (e, field) => {
    setCustomer({
      ...customer,
      profiles: [
        {
          ...customer.profiles[0],
          [field]: e.target.value
        }
      ]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!customer.name || !customer.email || !stateId || !localityId) {
      toast.error('Please fill out all required fields.')
      return
    }

    try {
      const response = await createCustomer({
        name: customer.name,
        email: customer.email,
        document_type: customer.profiles[0].document_type,
        document_number: customer.profiles[0].document_number,
        phone: customer.profiles[0].phone,
        state_id: stateId,
        locality_id: localityId
      })

      if (response.status === 200) {
        toast.success('Customer created successfully')
        navigate('/admin/customers')
      } else {
        toast.error('Error creating customer.')
      }
    } catch (error) {
      console.error('Error creating customer:', error)
      toast.error('Error creating customer. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row gap-5.5 p-2">
        <div className="w-full">
          <GeneralCard title="Crear cliente" className="p-4">
            <div className="flex flex-col gap-5.5 pb-4">
              {/* Nombre y Correo electrónico */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={customer.name}
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
                  value={customer.email}
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
                  value={customer.profiles[0].document_type}
                  onChange={(e) => handleProfileChange(e, 'document_type')}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary uppercase"
                >
                  <option value="" disabled>
                    Selecciona el tipo de documento
                  </option>
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
                  value={customer.profiles[0].document_number}
                  onChange={(e) => handleProfileChange(e, 'document_number')}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex flex-col md:flex-row gap-5.5 pb-4">
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  value={customer.profiles[0].phone}
                  onChange={(e) => handleProfileChange(e, 'phone')}
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
                  <option value="" disabled>
                    Selecciona la provincia
                  </option>
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
                  <option value="" disabled>
                    Selecciona la ciudad
                  </option>
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

export default CreateCustomer
