import api from '@app/libs/api'

export const getStatisticsDashboard = async () => {
  try {
    const { data } = await api.get('/statistics')
    return data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}
