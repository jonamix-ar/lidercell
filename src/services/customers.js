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
