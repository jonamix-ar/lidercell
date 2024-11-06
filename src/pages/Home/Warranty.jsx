import React, { useState } from 'react'
import {
  ShieldCheck,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import Navigation from '@app/components/Home/Navigation'
import WhatsAppContactButton from '../../components/common/WhatsAppContactButton'
import { ToastContainer } from 'react-toastify'

const Warranty = () => {
  const warranties = [
    { product: 'IPHONE NUEVOS', duration: '12 MESES DE GARANTIA OFICIAL' },
    {
      product: 'IPHONE USADOS',
      duration: '2 MESES DE GARANTIA - EN NUESTRAS SUCURSALES'
    },
    {
      product: 'IPHONE CPO',
      duration: '12 MESES GARANTIA OFICIAL INTERNACIONAL'
    },
    {
      product: 'XIAOMI',
      duration: '6 MESES DE GARANTIA POR CUALQUIER DEFECTO DE FABRICA'
    },
    {
      product: 'MOTOROLA - LG - SAMSUNG',
      duration: '6 MESES DE GARANTIA POR DEFECTO FABRICA'
    }
  ]

  const links = [
    {
      text: 'Chequear Garantía de un iPhone',
      url: 'https://checkcoverage.apple.com/ar/es/'
    },
    {
      text: '¿QUÉ ES UN IPHONE CPO?',
      url: 'https://store.apple.com/Catalog/es/Images/apple_certified.html'
    },
    {
      text: 'Verificar datos de IMEI de cualquier celular',
      url: 'https://www.enacom.gob.ar/imei'
    }
  ]

  const faqs = [
    {
      question: '¿Cómo puedo hacer efectiva mi garantía?',
      answer:
        'Para hacer efectiva tu garantía, debes presentar tu factura de compra y el producto en cualquiera de nuestras sucursales. Nuestro equipo técnico evaluará el problema y procederá según los términos de la garantía.'
    },
    {
      question: '¿Qué cubre la garantía?',
      answer:
        'La garantía cubre defectos de fabricación y mal funcionamiento no causado por el usuario. No cubre daños por mal uso, caídas, líquidos o modificaciones no autorizadas.'
    },
    {
      question: '¿Puedo extender mi garantía?',
      answer:
        'Actualmente no ofrecemos extensiones de garantía. Te recomendamos considerar la duración de la garantía al momento de tu compra.'
    }
  ]

  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <Navigation />
      <div className="container max-w-screen-xl mx-auto p-4">
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
              Garantía de Nuestros Productos
            </h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <ul className="divide-y divide-gray-200">
                {warranties.map((item, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ShieldCheck className="h-6 w-6 text-green-500 mr-3" />
                        <h2 className="text-lg font-medium text-gray-900">
                          {item.product}
                        </h2>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.duration}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <ExternalLink className="h-6 w-6 text-blue-500 mr-2" />
                  Enlaces Útiles
                </h2>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                      >
                        {link.text}
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <HelpCircle className="h-6 w-6 text-purple-500 mr-2" />
                  Preguntas Frecuentes
                </h2>
                <dl className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="pt-6 border-t border-gray-200">
                      <dt className="text-lg">
                        <button
                          onClick={() =>
                            setOpenFaq(openFaq === index ? null : index)
                          }
                          className="text-left w-full flex justify-between items-start text-gray-400"
                        >
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                          <span className="ml-6 h-7 flex items-center">
                            {openFaq === index ? (
                              <ChevronUp className="h-6 w-6" />
                            ) : (
                              <ChevronDown className="h-6 w-6" />
                            )}
                          </span>
                        </button>
                      </dt>
                      {openFaq === index && (
                        <dd className="mt-2 pr-12">
                          <p className="text-base text-gray-500">
                            {faq.answer}
                          </p>
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
        <WhatsAppContactButton />
      </div>
      <ToastContainer />
    </>
  )
}

export default Warranty
