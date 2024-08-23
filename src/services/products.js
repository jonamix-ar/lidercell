import api from '@app/libs/api'

export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getProductsWithPaginationSort = async ({
  currentPage,
  itemsPerPage,
  sortType,
  search = '',
  brand = 'all'
}) => {
  try {
    const brandFilter = brand !== 'all' ? `&brand=${brand}` : ''

    const response = await api.get(
      `/products/pagination?page=${currentPage}&limit=${itemsPerPage}&sort=${sortType}&search=${encodeURIComponent(search)}${brandFilter}`
    )

    return {
      products: response.data.products, // Suponiendo que tu API devuelve un array de productos
      totalItems: response.data.totalItems, // Suponiendo que tu API devuelve el número total de artículos
      totalPages: response.data.totalPages, // Suponiendo que tu API devuelve el número total de páginas
      currentPage: response.data.currentPage || currentPage // Maneja la página actual
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

export const exportProducts = async () => {
  try {
    const response = await api.get('/products/export', {
      responseType: 'blob' // Importante para manejar el archivo
    })

    // Crear un enlace de descarga
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'productos.xlsx') // Nombre del archivo
    document.body.appendChild(link)
    link.click()

    // Limpiar URL creada
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error al exportar:', error)
  }
}

export const importProducts = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await api.post('/products/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error al importar:', error)
    throw error
  }
}
