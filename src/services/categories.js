import api from '@app/libs/api'

export const getCategories = async () => {
  try {
    const response = await api.get('/categories')
    return response // Suponiendo que `response.data` contiene las categorías
  } catch (error) {
    console.error('Error al obtener las categorías:', error)
    throw error // Lanza el error para que pueda ser capturado por quien llama a esta función
  }
}

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`)
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const createCategory = async (category) => {
  try {
    const response = await api.post('/categories', category)
    return response
  } catch (error) {
    console.error('Error al crear la categoría:', error)
    throw error // Lanza el error para que pueda ser capturado por quien llama a esta función
  }
}

export const updateCategory = async (id, category) => {
  try {
    const response = await api.put(`/categories/${id}`, category)
    return response
  } catch (error) {
    console.error('Error al actualizar la categoría:', error)
    throw error
  }
}

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`)
    return response
  } catch (error) {
    console.error('Error al eliminar la categoría:', error)
    throw error
  }
}
