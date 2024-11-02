import api from '@app/libs/api'

export const getProducts = async (slug) => {
  try {
    const { data } = await api.get(`/api/products/${slug}`)
    return data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}
