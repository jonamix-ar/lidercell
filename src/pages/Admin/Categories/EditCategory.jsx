import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import GeneralCard from '@app/components/Cards/GeneralCard'
import Loading from '@app/components/common/Loading'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { getCategoryById, updateCategory } from '@app/services/categories'

const EditCategory = () => {
  let { id } = useParams()
  const [category, setCategory] = useState(null)
  const [enabled, setEnabled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const resp = await getCategoryById(id)
        console.log('🚀 ~ fetchCategory ~ resp:', resp)
        if (resp.status === 200) {
          setCategory(resp.data.category)
          setEnabled(resp.data.category.status == 1)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategory()
  }, [id])

  const handleUpdate = async (event) => {
    event.preventDefault()

    try {
      const updatedCategory = {
        ...category,
        enabled: enabled ? 1 : 0
      }

      await updateCategory(id, updatedCategory)

      toast.success('Categoría actualizada correctamente', {
        position: 'bottom-right',
        autoClose: 5000
      })

      navigate('/admin/categories')
    } catch (error) {
      toast.error('Error al actualizar la categoría', {
        position: 'bottom-right',
        autoClose: 5000
      })
    }
  }

  const handleToggle = () => {
    setEnabled(!enabled)
    setCategory({ ...category, status: !enabled ? 1 : 0 })
  }

  return (
    <GeneralCard title={`Editar Categoría: ${category?.name}`} className="pb-2">
      {category ? (
        <form onSubmit={handleUpdate}>
          {/* Formulario para editar la categoría */}
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={category.name}
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Descripción
              </label>
              <textarea
                id="description"
                value={category.description}
                onChange={(e) =>
                  setCategory({ ...category, description: e.target.value })
                }
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
                <span>Guardar</span>
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
      ) : (
        <Loading />
      )}
    </GeneralCard>
  )
}

export default EditCategory
