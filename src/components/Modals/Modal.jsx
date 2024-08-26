import React, { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'

const Modal = ({ isOpen, onClose, title, children }) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowModal(true)
      setTimeout(() => setShowModal(true), 10) // Small delay to trigger the transition
    } else {
      setShowModal(false)
    }
  }, [isOpen])

  if (!isOpen && !showModal) return null
  

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div
        className={`bg-white rounded-lg p-4 w-1/2 relative transform transition-all duration-300 ${
          showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button
            className="inline-flex items-center justify-center gap-2 p-2 text-sm font-medium text-slate-600 hover:bg-opacity-90"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
        </div>
        <div>{children}</div>
        <div className="flex justify-end items-center mt-4">
          <button
            className="p-2 rounded-md  text-sm font-medium text-slate-600 hover:bg-opacity-90"
            onClick={onClose}
          >
            <span>Cerrar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
