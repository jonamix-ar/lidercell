import api from '@app/libs/api'

export const getBrands = async () => {
  try {
    const { data } = await api.get('/brands')
    return data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}
