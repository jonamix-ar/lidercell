import React, { useState } from 'react'
import GeneralCard from '@app/components/Cards/GeneralCard'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import axios from '@app/libs/axios'
import { toast } from 'react-toastify'

const CreateCategory = () => {
  const [enabled, setEnabled] = useState(false)
  const navigate = useNavigate() // Use useNavigate instead of Navigate

  const handleUpdate = async (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const description = e.target.description.value

    // Validación simple
    if (!name || !description) {
      toast.error('Por favor, complete todos los campos.', {
        position: 'bottom-right',
        autoClose: 5000
      })
      return
    }

    const newCategory = {
      name,
      description,
      enabled: enabled ? 1 : 0
    }

    try {
      const response = await axios.post('/categories', newCategory)

      if (response.status === 201) {
        toast.success('Categoría creada exitosamente', {
          position: 'bottom-right',
          autoClose: 5000
        })
        navigate('/admin/categories') // Redirect using navigate
      }
    } catch (error) {
      console.error('Error al crear la categoría:', error)
      toast.error(
        `Error al crear la categoría: ${
          error.response?.data?.message || 'Error desconocido'
        }`,
        {
          position: 'bottom-right',
          autoClose: 5000
        }
      )
    }
  }

  const handleToggle = () => {
    setEnabled(!enabled)
  }

  return (
    <GeneralCard title={`Nueva Categoría`} className="pb-2">
      <form onSubmit={handleUpdate}>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ingrese el nombre de la categoría"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Ingrese la descripción de la categoría"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="toggle1"
              className="flex cursor-pointer select-none items-center"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggle1"
                  className="sr-only"
                  checked={enabled}
                  onChange={handleToggle}
                />
                <div className="block h-8 w-14 rounded-full bg-[#E5E7EB] dark:bg-[#5A616B]"></div>
                <div
                  className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                    enabled &&
                    '!right-1 !translate-x-full !bg-blue-600 dark:!bg-white'
                  }`}
                ></div>
              </div>
              <div className="ml-3 text-black dark:text-white">¿Activo?</div>
            </label>
          </div>

          <div className="flex flex-wrap gap-2 xl:gap-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              <span>
                <FiSave />
              </span>
              <span>Crear</span>
            </button>

            <Link
              to="/admin/categories"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              <span>
                <FiArrowLeft />
              </span>
              <span>Volver</span>
            </Link>
          </div>
        </div>
      </form>
    </GeneralCard>
  )
}

export default CreateCategory
