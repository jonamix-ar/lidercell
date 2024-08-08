import api from '@app/libs/api'

export const getProducts = async () => {
  try {
    const { data } = await api.get('/products')
    return data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getProductById = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`)
    return data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const updateProduct = async (id, product) => {
  try {
    // Make sure to send the product object to the backend
    const { data } = await api.put(`/products/${id}/update`, product)
    return data
  } catch (error) {
    console.error('Error al actualizar el producto:', error)
    throw error // Re-throw the error to be caught in handleUpdate
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}/delete`)
    // Ensure the response has a `data` property with a status or message
    return response
  } catch (error) {
    console.error('Error al eliminar el producto:', error)
    throw error // Rethrow the error to be handled in the calling function
  }
}

export const getProductsSearch = async () => {
  try {
    const response = await api.get('/products') // Adjust the API endpoint as needed
    console.log('API response:', response) // Log the entire response

    // Check if the response contains data and if it's an array
    if (response.data && Array.isArray(response.data.products)) {
      return response.data.products
    } else {
      console.error('Unexpected response format:', response.data)
      return []
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
