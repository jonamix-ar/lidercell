import React, { useEffect, useState, useRef } from 'react'
import GeneralCard from '@app/components/Cards/GeneralCard'
import { getCategories } from '@app/services/categories'
import { getBrands } from '@app/services/brands'
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { Dropzone } from 'dropzone'
import 'dropzone/dist/dropzone.css' // Ensure Dropzone CSS is imported
import { createProduct } from '@app/services/products'
import { toast } from 'react-toastify'

const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [showPrice, setShowPrice] = useState(false)
  const [showPriceWholesaler, setShowPriceWholesaler] = useState(false)
  const dropzoneRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    brand_id: '',
    pre_owned: 0,
    description: '',
    color: '',
    storage: '',
    sku: '',
    price: 0.0,
    priceWholesaler: 0.0,
    showPrice: 0,
    showPriceWholesaler: 0,
    qty: 0,
    status: true
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getCategories()
        const brandsResponse = await getBrands()
        setCategories(categoriesResponse.data.categories)
        setBrands(brandsResponse.brands)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(error.response.data.message)
        }
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (dropzoneRef.current) {
      const myDropzone = new Dropzone(dropzoneRef.current, {
        url: `${import.meta.env.VITE_REACT_APP_BACKEND}/upload`,
        paramName: 'file', // The name that will be used to transfer the file
        maxFilesize: 2, // MB
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        dictDefaultMessage:
          'Arrastra y suelta archivos aquí o haz clic para subir.',
        init: function () {
          this.on('success', function (file, response) {
            // Assuming response contains the file path
            if (response && response.filePath) {
              setFormData((prevState) => ({
                ...prevState,
                picture: response.filePath
              }))
            } else {
              toast.error('Error al obtener la ruta del archivo subido.', {
                position: 'bottom-right',
                autoClose: 5000
              })
            }
          })
        }
      })

      return () => {
        myDropzone.destroy()
      }
    }
  }, [dropzoneRef])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleToogleShowPrice = () => {
    setShowPrice((prevState) => !prevState)
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPrice: !showPrice ? '1' : '0' // '1' para activado, '0' para desactivado
    }))
  }

  const handleToogleShowPriceWholesaler = () => {
    setShowPriceWholesaler((prevState) => !prevState)
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPriceWholesaler: !showPriceWholesaler ? '1' : '0' // '1' para activado, '0' para desactivado
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('Product created:', formData)
      // Aquí puedes realizar la petición a tu API para guardar el producto
      await createProduct(formData)
      // Redirigir al usuario a una nueva ruta o mostrar un mensaje de exito
      toast.success('Producto creado correctamente', {
        position: 'bottom-right',
        autoClose: 5000
      })
      navigate('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row gap-5.5 p-3">
        <div className="w-3/4">
          <GeneralCard title="Crear nuevo producto" className="p-4">
            <div className="flex flex-col gap-5.5">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Producto
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Escriba el nombre del producto"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-5.5 w-full">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Categoría
                  </label>
                  <select
                    id="category"
                    name="category_id"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.category_id}
                    onChange={handleSelectChange}
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-1/4">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Marca
                  </label>
                  <select
                    id="brand"
                    name="brand_id"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.brand_id}
                    onChange={handleSelectChange}
                  >
                    <option value="">Seleccione una marca</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-1/4">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Estado del producto?
                  </label>
                  <select
                    id="status"
                    name="pre_owned"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.pre_owned}
                    onChange={handleSelectChange}
                  >
                    <option value="">Seleccione un estado</option>
                    {[
                      { id: 0, name: 'Nuevo' },
                      { id: 1, name: 'Seminuevo' },
                      { id: 2, name: 'Reacondicionado' }
                    ].map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5.5 w-full">
                <div className="w-full">
                  <label
                    htmlFor="description"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-4 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5.5 w-full">
                <div className="w-1/2">
                  <label
                    htmlFor="color"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el nombre del producto"
                    value={formData.color}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="storage"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Almacenamiento
                  </label>
                  <input
                    type="text"
                    id="storage"
                    name="storage"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba la capacidad de almacenamiento"
                    value={formData.storage}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5.5 w-full">
                <div className="w-1/4">
                  <label
                    htmlFor="sku"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    SKU/Cod. Barras
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el SKU o código de barras"
                    value={formData.sku}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-1/4">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio USD
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min={0.0}
                    step={0.01}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el precio en USD"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-1/4">
                  <label
                    htmlFor="priceWholesaler"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio USD Mayorista
                  </label>
                  <input
                    type="number"
                    id="priceWholesaler"
                    name="priceWholesaler"
                    min={0.0}
                    step={0.01}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el precio mayorista en USD"
                    value={formData.priceWholesaler}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-1/4">
                  <label
                    htmlFor="qty"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cantidad en almacen
                  </label>
                  <input
                    type="number"
                    id="qty"
                    name="qty"
                    min={1}
                    step={1.0}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba la cantidad en almacén"
                    value={formData.qty}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5.5 w-full">
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
                  to="/admin/products"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
                >
                  <span>
                    <FiArrowLeft />
                  </span>
                  <span>Volver</span>
                </Link>
              </div>
            </div>
          </GeneralCard>
        </div>
        <div className="w-1/4">
          <GeneralCard title="Imagen" className="p-4">
            <div className="flex flex-col gap-5.5">
              <div className="w-full">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Imagen del artículo
                </label>
                <div className="flex justify-center">
                  {/* Aquí puedes agregar la lógica para mostrar la imagen si existe */}
                </div>
              </div>
              <div className="w-full">
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
                        <FiUpload className="text-xl" />
                      </div>
                    </div>
                    <span className="font-medium text-black dark:text-white">
                      Arrastra y suelta archivos aquí o haz clic para subir.
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="toggle1"
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="toggle1"
                      className="sr-only"
                      checked={showPrice}
                      onChange={handleToogleShowPrice}
                    />
                    <div className="block h-8 w-14 rounded-full bg-[#E5E7EB] dark:bg-[#5A616B]"></div>
                    <div
                      className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                        showPrice &&
                        '!right-1 !translate-x-full !bg-blue-600 dark:!bg-white'
                      }`}
                    ></div>
                  </div>
                  <div className="ml-3 text-black dark:text-white">
                    Mostrar Precio
                  </div>
                </label>
              </div>

              <div className="w-full">
                <label
                  htmlFor="wholesaler-toggle1"
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="wholesaler-toggle1"
                      className="sr-only"
                      checked={showPriceWholesaler}
                      onChange={handleToogleShowPriceWholesaler}
                    />
                    <div className="block h-8 w-14 rounded-full bg-[#E5E7EB] dark:bg-[#5A616B]"></div>
                    <div
                      className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                        showPriceWholesaler &&
                        '!right-1 !translate-x-full !bg-blue-600 dark:!bg-white'
                      }`}
                    ></div>
                  </div>
                  <div className="ml-3 text-black dark:text-white">
                    Mostrar Precio Mayorista
                  </div>
                </label>
              </div>
            </div>
          </GeneralCard>
        </div>
      </div>
    </form>
  )
}

export default CreateProduct
