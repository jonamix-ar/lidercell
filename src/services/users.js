import api from '@app/libs/api'

export const getUsers = async () => {
  try {
    const response = await api.get('/users')
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData)
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}
