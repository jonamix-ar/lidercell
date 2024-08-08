import api from '@app/libs/api'

export const generateSales = async (saleData, saleProducts) => {
  try {
    const response = await api.post('/sales', {
      sale: saleData,
      products: saleProducts
    })
    return response.data
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}
