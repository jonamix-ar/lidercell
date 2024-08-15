import api from '@app/libs/api'

export const getBrands = async () => {
  try {
    const { data } = await api.get('/brands')
    return data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getBrandById = async (id) => {
  try {
    const data = await api.get(`/brands/${id}`)
    return data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const createBrand = async (brand) => {
  try {
    const { data } = await api.post('/brands', brand)
    return data
  } catch (error) {
    console.error('Error al crear la marca:', error)
    throw error // Rethrow the error to be handled by the calling function
  }
}

export const updateBrand = async (id, brand, enabled) => {
  try {
    const { data } = await api.put(`/brands/${id}`, {
      ...brand,
      status: enabled ? 1 : 0
    })
    return data
  } catch (error) {
    console.error('Error al actualizar la marca:', error)
    throw error // Rethrow the error to be handled by the calling function
  }
}


export const deleteBrand = async (id) => {
  try {
    const response = await api.delete(`/brands/${id}`)
    // Ensure the response has a `data` property with a status or message
    return response
  } catch (error) {
    console.error('Error al eliminar la marca:', error)
    throw error // Rethrow the error to be handled in the calling function
  }
}
