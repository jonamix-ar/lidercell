import api from '@app/libs/api'

export const getCategories = async () => {
  try {
    const { data } = await api.get('/categories')
    return data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}
