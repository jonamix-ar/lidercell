import api from '@app/libs/api'

export const getStates = async () => {
  try {
    const response = await api.get('/settings/states')
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getLocalities = async () => {
  try {
    const response = await api.get('/settings/localities')
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}
