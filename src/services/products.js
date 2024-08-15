import api from '@app/libs/api'

export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getProductsWithPagination = async ({
  currentPage,
  itemsPerPage
}) => {
  try {
    const response = await api.get(
      `/products?page=${currentPage}&limit=${itemsPerPage}`
    )

    return {
      products: response.data.products, // assuming your API returns a products array
      totalItems: response.data.totalItems, // assuming your API returns the total number of items
      totalPages: response.data.totalPages, // assuming your API returns the total number of pages
      currentPage: response.data.currentPage || currentPage // handle current page
    }
  } catch (error) {
    console.error('Error al obtener los productos con paginación:', error)
    return null
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

export const createProduct = async (product) => {
  try {
    const response = await api.post('/products', product)
    return response
  } catch (error) {
    console.error('Error al crear el producto:', error)
    throw error // Re-throw the error to be caught in handleCreate
  }
}

export const updateProduct = async (id, product) => {
  try {
    // Make sure to send the product object to the backend
    const response = await api.put(`/products/${id}`, product)
    return response
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
