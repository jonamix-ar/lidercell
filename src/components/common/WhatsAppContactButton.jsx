'use client'

import { useState, useEffect } from 'react'
import { X, Phone, Mail, MapPin, Clock, Send, ArrowLeft } from 'lucide-react'
import WhatsAppIcon from '../Icons/WhatsAppIcon'
import FacebookIcon from '../Icons/FacebookIcon'
import InstagramIcon from '../Icons/InstagramIcon'
import TikTockIcon from '../Icons/TikTockIcon'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendEmail } from '../../services/api'

export default function WhatsAppContactButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEmailForm, setIsEmailForm] = useState(false)
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const contacts = [
    { name: 'Showroom y Reparaciones', number: '+5493425052650' },
    { name: 'Ventas mayoristas', number: '+5493426392830' },
    { name: 'Atención venta personalizada', number: '+5493425675691' }
  ]

  const facebookLink = 'https://web.facebook.com/lidercell'
  const instagramLink = 'https://www.instagram.com/lidercelltelefonia'
  const tiktokLink = 'https://www.tiktok.com/@lidercelltelefonia_'

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = sendEmail(emailForm)
      console.log('🚀 ~ handleEmailSubmit ~ response:', response)

      toast.success('Correo enviado exitosamente', {
        position: 'bottom-right',
        autoClose: 5000
      })
      setEmailForm({ name: '', email: '', phone: '', message: '' })
      setIsOpen(false)
      setIsEmailForm(false)
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error(
        'Error al enviar el correo. Por favor, inteéntalo nuevamente.',
        {}
      )
    }
  }

  return (
    <>
      <button
        className="fixed bottom-4 right-4 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir chat de WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8 fill-current" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'scale(1)' : 'scale(0.95)'
            }}
          >
            <div className="flex justify-between items-center p-6 bg-green-500 rounded-t-lg">
              <h2 className="text-2xl font-bold text-white">
                {isEmailForm ? 'Contacto por Email' : 'Contacto WhatsApp'}
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsEmailForm(false)
                }}
                className="text-white hover:text-gray-200 transition-colors duration-200"
                aria-label="Cerrar modal de contacto"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {isEmailForm ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={emailForm.name}
                      onChange={(e) =>
                        setEmailForm({ ...emailForm, name: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-2.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo eléctronico
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={emailForm.email}
                      onChange={(e) =>
                        setEmailForm({ ...emailForm, email: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-2.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Teléfono
                    </label>
                    <input
                      type="phone"
                      id="phone"
                      value={emailForm.phone}
                      onChange={(e) =>
                        setEmailForm({ ...emailForm, phone: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-2.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      value={emailForm.message}
                      onChange={(e) =>
                        setEmailForm({ ...emailForm, message: e.target.value })
                      }
                      rows={4}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-2.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Email
                  </button>
                </form>
              ) : (
                <>
                  <div className="space-y-4">
                    {contacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {contact.name}
                          </h3>
                          <p className="text-gray-600">{contact.number}</p>
                        </div>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
                          onClick={() =>
                            window.open(
                              `https://wa.me/${contact.number.replace(/[^0-9]/g, '')}`,
                              '_blank'
                            )
                          }
                          aria-label={`Iniciar chat en WhatsApp con ${contact.name}`}
                        >
                          <WhatsAppIcon className="w-5 h-5 mr-2 fill-current" />
                          Chat
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>tienda@lidercell.com.ar</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>mayorista@lidercell.com.ar</span>
                    </div>
                    <div className="flex items-start text-gray-600">
                      <MapPin className="w-5 h-5 mr-2 mt-1" />
                      <span>
                        25 de Mayo, 2890, Ciudad de Santa Fe, Capital 3000
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>
                        Tienda, ShowRoom: Lunes a Viernes, 10:00 AM - 18:00 PM
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>
                        Mayorista: Lunes a Viernes, 09:00 AM - 16:30 PM
                      </span>
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex space-x-4">
                  <Link
                    to={facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-8 h-8 fill-blue-600 hover:fill-blue-700" />
                  </Link>
                  <Link
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-8 h-8 fill-pink-600 hover:fill-pink-700" />
                  </Link>
                  <Link
                    to={tiktokLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <TikTockIcon className="w-9 h-9 fill-blue-800 hover:fill-blue-900" />
                  </Link>
                </div>
                <button
                  onClick={() => setIsEmailForm(!isEmailForm)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
                >
                  {isEmailForm ? (
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  ) : (
                    <Mail className="w-5 h-5 mr-2" />
                  )}
                  {isEmailForm ? 'Volver' : 'Contacto por Email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
