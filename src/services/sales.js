import api from '@app/libs/api'
import { useState } from 'react'

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

export const getSales = async () => {
  try {
    const response = await api.get('/sales')
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getSaleById = async (id) => {
  try {
    const response = await api.get(`/sales/${id}`)
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getDocumentTypes = async () => {
  try {
    const response = await api.get('/receipts')
    return response
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
  }
}

export const getDocumentNumber = async (documentTypeId) => {
  try {
    const response = await api.post('/sales/document-number', {
      documentTypeId: documentTypeId
    })
    console.log('Respuesta cruda de la API:', response.data) // Verifica el contenido de response.data
    return response.data // Asegúrate de que esto devuelve un objeto con documentNumber
  } catch (error) {
    console.error('Error al obtener el número de documento:', error)
    throw error
  }
}
