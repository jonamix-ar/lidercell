import { useState } from 'react'
import api from '@app/libs/api'

export const useDocumentNumber = () => {
  const [documentNumber, setDocumentNumber] = useState(null)

  const generateDocumentNumber = async (documentTypeId) => {
    try {
      const response = await api.post('/sales/documents-number', {
        documentTypeId: documentTypeId // Enviar el ID del tipo de documento en el cuerpo de la solicitud
      })

      if (response && response.data) {
        setDocumentNumber(response.data.documentNumber)
        return response.data.documentNumber
      }
    } catch (error) {
      console.error('Error al obtener el número de documento:', error)
      throw error
    }
  }

  return { documentNumber, generateDocumentNumber }
}
