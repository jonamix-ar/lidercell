import api from '@app/libs/api'

export const getCustomers = async () => {
  try {
    const response = await api.get('/customers')
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getCustomerById = async (id) => {
  try {
    const response = await api.get(`/customers/${id}`)
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const createCustomer = async (customerData) => {
  try {
    const response = await api.post('/customers', customerData)
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await api.put(`/customers/${id}`, customerData)
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getCustomersSearch = async () => {
  try {
    const response = await api.get('/customers') // Llamada al endpoint
    console.log('API response:', response.data) // Log para verificar la estructura exacta

    // Acceder al array de customers dentro de response.data.customers
    if (response.data && Array.isArray(response.data.customers)) {
      return response.data.customers // Devuelve el array de clientes
    } else {
      console.error('Unexpected response format:', response.data)
      return []
    }
  } catch (error) {
    console.error('Error fetching customers:', error)
    throw error
  }
}
