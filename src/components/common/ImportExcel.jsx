import { useRef } from 'react'
import { importProducts } from '../../services/products'
import { toast } from 'react-toastify'
import { FaFileImport } from 'react-icons/fa'

const ImportExcel = () => {
  const fileInputRef = useRef(null)

  const handleFileChange = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]

    if (!file) {
      alert('Por favor, selecciona un archivo.')
      return
    }

    // Verifica que el archivo sea de tipo .xlsx
    if (!file.name.endsWith('.xlsx')) {
      alert('Por favor, selecciona un archivo Excel (.xlsx).')
      return
    }

    try {
      await importProducts(file)
      toast.success('Datos importados con éxito')
    } catch (error) {
      console.error('Error al importar:', error)
      toast.error('Error al importar los datos')
    }
  }

  const openFileDialog = () => {
    fileInputRef.current.click()
  }

  return (
    <div>
      <button
        className="inline-flex items-center justify-center gap-2 p-2 rounded-md bg-slate-800 text-sm text-center font-medium text-white hover:bg-opacity-90"
        onClick={openFileDialog}
      >
        <FaFileImport /> Importar Productos
      </button>
      <input
        type="file"
        accept=".xlsx"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default ImportExcel
