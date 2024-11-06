import api from '@app/libs/api'

export const getProducts = async (slug) => {
  try {
    const { data } = await api.get(`/api/products/${slug}`)
    return data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const sendEmail = async (data) => {
  try {
    const response = await api.post('/api/send-email', data)
    return response.data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}
