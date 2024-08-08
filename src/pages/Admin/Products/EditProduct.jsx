import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css' // Ensure Dropzone CSS is imported
import GeneralCard from '@app/components/Cards/GeneralCard'
import { getProductById, updateProduct } from '@app/services/products'
import { getCategories } from '@app/services/categories'
import { getBrands } from '@app/services/Brands'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const dropzoneRef = useRef(null)
  const [showPrice, setShowPrice] = useState(false)
  const [showPriceWholesaler, setShowPriceWholesaler] = useState(false)
  const imgSrcPlaceholder = 'https://placehold.co/600x400'

  useEffect(() => {
    let myDropzone = null

    const fetchData = async () => {
      try {
        const data = await getProductById(id)
        setProduct(data.product)
        setShowPrice(data.product.show_price == 1)
        setShowPriceWholesaler(data.product.show_price_wholesaler == 1)
        const categories = await getCategories()
        setCategories(categories.data)
        const dataBrands = await getBrands()
        setBrands(dataBrands.brands)

        if (dropzoneRef.current && !myDropzone) {
          myDropzone = new Dropzone(dropzoneRef.current, {
            url: `${import.meta.env.VITE_REACT_APP_BACKEND_API}/upload/productos`,
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
                  toast.error('Error al obtener la ruta del archivo subido.', {
                    position: 'bottom-right',
                    autoClose: 5000
                  })
                }
              })
            }
          })
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(error.response.data.message)
        }
      }
    }

    fetchData()

    return () => {
      if (myDropzone) {
        myDropzone.destroy()
      }
    }
  }, [id]) // Depend on `id` or any other dependencies if needed

  const handleToogleShowPrice = () => {
    setShowPrice((prevState) => !prevState)
  }

  const handleToogleShowPriceWholesaler = () => {
    setShowPriceWholesaler((prevState) => !prevState)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      // Log the product object to see its contents
      console.log(product)

      // Ensure you have the product ID available
      const id = product.id // or however you are managing the product ID

      // Call the updateProduct function with the ID and product data
      await updateProduct(id, product)

      toast.success('Producto actualizado correctamente', {
        position: 'bottom-right',
        autoClose: 5000
      })
      navigate('/admin/products')
    } catch (error) {
      // Log the error to the console for debugging
      console.error('Error al actualizar el producto:', error)

      // Display error message to the user
      toast.error(
        'Error al actualizar el producto. Por favor, intenta de nuevo.',
        {
          position: 'bottom-right',
          autoClose: 5000
        }
      )
    }
  }

  return (
    <form onSubmit={handleUpdate}>
      <div className="flex flex-row gap-5.5 p-3">
        <div className="w-3/4">
          <GeneralCard
            title={`Editar Producto: ${product.name}`}
            className="p-4"
          >
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
                  value={product.name || ''}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={product.category_id || ''}
                    onChange={(e) =>
                      setProduct({ ...product, category_id: e.target.value })
                    }
                  >
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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={product.brand_id || ''}
                    onChange={(e) =>
                      setProduct({ ...product, brand_id: e.target.value })
                    }
                  >
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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={product.status || ''}
                    onChange={(e) =>
                      setProduct({ ...product, status: e.target.value })
                    }
                  >
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
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    value={product.description || ''}
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-4 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5.5 w-full">
                <div className="w-1/2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el nombre del producto"
                    value={product.color || ''}
                    onChange={(e) =>
                      setProduct({ ...product, color: e.target.value })
                    }
                    required
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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el nombre del producto"
                    value={product.storage || ''}
                    onChange={(e) =>
                      setProduct({ ...product, storage: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5.5 w-full">
                <div className="w-1/4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    SKU/Cod. Barras
                  </label>
                  <input
                    type="text"
                    id="sku"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el nombre del producto"
                    value={product.sku || ''}
                    onChange={(e) =>
                      setProduct({ ...product, sku: e.target.value })
                    }
                  />
                </div>

                <div className="w-1/4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio USD
                  </label>
                  <input
                    type="number"
                    id="price"
                    min={0.0}
                    step={0.01}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el nombre del producto"
                    value={product.price || ''}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                </div>

                <div className="w-1/4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Precio USD Mayorista
                  </label>
                  <input
                    type="number"
                    id="price"
                    min={0.0}
                    step={0.01}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el nombre del producto"
                    value={product.price_wholesaler || ''}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        price_wholesaler: e.target.value
                      })
                    }
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
                    min={1}
                    step={1.0}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Escriba el nombre del producto"
                    value={product.qty || ''}
                    onChange={(e) =>
                      setProduct({ ...product, qty: e.target.value })
                    }
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
                  <img
                    src={
                      product.picture
                        ? `${import.meta.env.VITE_REACT_APP_BACKEND_API_STORAGE}/uploads/productos/${product.picture}`
                        : imgSrcPlaceholder
                    }
                    alt={product.name}
                    className="w-32 h-32 object-contain rounded-md"
                  />
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

export default EditProduct
