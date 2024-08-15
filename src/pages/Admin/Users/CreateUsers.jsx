import React, { useState } from 'react'
import GeneralCard from '@app/components/Cards/GeneralCard'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { createUser } from '@app/services/users'

const CreateUsers = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelected = (e) => {
    setFormData({ ...formData, role: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden', {
        position: 'bottom-right',
        autoClose: 5000
      })
      return
    }

    try {
      console.log('User created:', formData)

      await createUser(formData)
      toast.success('Usuario creado exitosamente', {
        position: 'bottom-right',
        autoClose: 5000
      })
      navigate('/admin/users')
    } catch (error) {
      toast.error(
        `Error al crear el usuario: ${error.response?.data?.message || 'Error desconocido'}`,
        {
          position: 'bottom-right',
          autoClose: 5000
        }
      )
    }
  }

  return (
    <GeneralCard title={`Nuevo Usuario`} className="pb-2">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-5 p-6.5">
          <div className="w-1/2">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ingresa el nombre"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Rol
            </label>
            <select
              id="documentType"
              name="document_type"
              placeholder="Tipo de documento"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary capitalize"
              value={formData.role}
              onChange={handleSelected}
            >
              {[
                { value: '', label: 'Seleccione un rol' },
                { value: 'admin', label: 'Administrador' },
                { value: 'customer', label: 'Cliente' },
                { value: 'wholesaler', label: 'Mayorista' },
                { value: 'seller', label: 'Vendedor' }
              ].map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingrese el correo electrónico"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-5 p-6.5">
          <div className="w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Contraseña
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primarys"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Repetir contraseña
            </label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primarys"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 xl:gap-4 p-6.5">
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
            to="/admin/brands"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
          >
            <span>
              <FiArrowLeft />
            </span>
            <span>Volver</span>
          </Link>
        </div>
      </form>
    </GeneralCard>
  )
}

export default CreateUsers
