import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Dropzone from 'dropzone' // Asegúrate de que Dropzone está importado correctamente
import 'dropzone/dist/dropzone.css'
import axios from '@app/libs/axios'
import GeneralCard from '@app/components/Cards/GeneralCard'
import Loading from '@app/components/common/Loading'
import { toast } from 'react-toastify'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { updateBrand, getBrandById } from '@app/services/Brands'

const EditBrands = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [brand, setBrand] = useState(null)
  const [enabled, setEnabled] = useState(false)
  const dropzoneRef = useRef(null)
  const imgSrcPlaceholder = 'https://placehold.co/600x400'
  const imageBrands = `${import.meta.env.VITE_REACT_APP_BACKEND_API_STORAGE}`

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await getBrandById(id)
        if (response.status === 200) {
          setBrand(response.data.brand)
          setEnabled(response.data.brand.status === 1)
          // Initialize Dropzone here
          if (dropzoneRef.current) {
            const myDropzone = new Dropzone(dropzoneRef.current, {
              url: `${import.meta.env.VITE_REACT_APP_BACKEND_API}/upload`,
              paramName: 'file', // The name that will be used to transfer the file
              maxFilesize: 2, // MB
              acceptedFiles: 'image/*',
              addRemoveLinks: true,
              dictDefaultMessage:
                'Arrastra y suelta archivos aquí o haz clic para subir.',
              init: function () {
                this.on('success', function (file, response) {
                  if (response && response.filePath) {
                    setBrand((prevState) => ({
                      ...prevState,
                      picture: response.filePath
                    }))
                  } else {
                    toast.error(
                      'Error al obtener la ruta del archivo subido.',
                      {
                        position: 'bottom-right',
                        autoClose: 5000
                      }
                    )
                  }
                })
              }
            })

            return () => {
              myDropzone.destroy()
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchBrand()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await updateBrand(id, brand, enabled)
      toast.success('Marca actualizada correctamente', {
        position: 'bottom-right',
        autoClose: 5000
      })
      navigate('/admin/brands')
    } catch (error) {
      toast.error('Error al actualizar la marca:', error, {
        position: 'bottom-right',
        autoClose: 5000
      })
    }
  }

  const handleToggle = () => {
    setEnabled(!enabled)
    setBrand((prevState) => ({
      ...prevState,
      status: !enabled ? 1 : 0
    }))
  }

  return (
    <GeneralCard title={`Editar marca: ${brand?.name}`} className="pb-2">
      {brand ? (
        <form onSubmit={handleUpdate}>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={brand.name}
                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Descripción
              </label>
              <textarea
                id="description"
                value={brand.description}
                onChange={(e) =>
                  setBrand({ ...brand, description: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
            <div className="md:1/4">
              <img
                src={
                  brand.picture
                    ? `${imageBrands}/${brand.picture}`
                    : imgSrcPlaceholder
                }
                alt={brand.name}
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <div className="md:3/4">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Imagen o logo *
              </label>
              <div
                className="dropzone rounded-md !border-dashed !border-bodydark1 bg-gray hover:!border-primary dark:!border-strokedark dark:bg-graydark dark:hover:!border-primary"
                ref={dropzoneRef}
              >
                <div className="dz-message">
                  <div className="mb-2.5 flex justify-center">
                    <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-black shadow-10 dark:bg-black dark:text-white">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1867_11682)">
                          <path
                            d="M18.75 13.75C18.375 13.75 18.0313 14.0625 18.0313 14.4687V17.25C18.0313 17.5312 17.8125 17.75 17.5312 17.75H2.46875C2.1875 17.75 1.96875 17.5312 1.96875 17.25V14.4687C1.96875 14.0625 1.625 13.75 1.25 13.75C0.875 13.75 0.53125 14.0625 0.53125 14.4687V17.25C0.53125 18.3125 1.375 19.1562 2.4375 19.1562H17.5312C18.5938 19.1562 19.4375 18.3125 19.4375 17.25V14.4687C19.4688 14.0625 19.125 13.75 18.75 13.75Z"
                            fill=""
                          />
                          <path
                            d="M5.96875 6.46875L9.3125 3.21875V14.0313C9.3125 14.4063 9.625 14.75 10.0312 14.75C10.4062 14.75 10.75 14.4375 10.75 14.0313V3.21875L14.0937 6.46875C14.2187 6.59375 14.4062 6.65625 14.5938 6.65625C14.7812 6.65625 14.9688 6.59375 15.0938 6.4375C15.375 6.15625 15.3438 5.71875 15.0938 5.4375L10.5 1.0625C10.2187 0.8125 9.78125 0.8125 9.53125 1.0625L4.96875 5.46875C4.6875 5.75 4.6875 6.1875 4.96875 6.46875C5.25 6.71875 5.6875 6.75 5.96875 6.46875Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1867_11682">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <span className="font-medium text-black dark:text-white">
                    Arrastra y suelta archivos aquí o haz clic para subir.
                  </span>
                </div>
              </div>
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
                to="/admin/brands"
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

export default EditBrands
