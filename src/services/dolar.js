import axios from '@app/libs/axios'

export const getDolar = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_API_DOLAR}/dolares/blue`,
      { withCredentials: false }
    )
    // Verificar si la respuesta es correcta y devolver los datos
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(
        `Error en la respuesta del servidor: ${response.statusText}`
      )
    }
  } catch (error) {
    console.error('Error al obtener los datos de configuración:', error)
    throw error // Lanzar el error para que pueda ser manejado por el llamador
  }
}
