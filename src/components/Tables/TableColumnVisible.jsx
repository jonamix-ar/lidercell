import React, { useState } from 'react'
import { FaRegListAlt } from 'react-icons/fa'

const TableColumnVisible = ({ table }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const [selectedKeys, setSelectedKeys] = useState(
    new Set(
      table
        .getAllLeafColumns()
        .filter((col) => col.getIsVisible())
        .map((col) => col.id)
    )
  )

  const handleSelectionChange = (keys) => {
    const newKeys = new Set(keys)
    setSelectedKeys(newKeys)

    table.getAllLeafColumns().forEach((column) => {
      const shouldBeVisible = newKeys.has(column.id)
      if (column.getIsVisible() !== shouldBeVisible) {
        column.toggleVisibility()
      }
    })
  }

  const handleToggleAll = () => {
    const allVisible = table.getIsAllColumnsVisible()
    table.toggleAllColumnsVisible(!allVisible)
    if (allVisible) {
      setSelectedKeys(new Set())
    } else {
      setSelectedKeys(new Set(table.getAllLeafColumns().map((col) => col.id)))
    }
  }

  const filteredColumns = table
    .getAllLeafColumns()
    .filter(
      (column) =>
        column.id !== 'selected' &&
        column.columnDef.id !== 'selected' &&
        column.id !== 'actions'
    )
  const allColumnsVisible = table.getIsAllColumnsVisible()

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FaRegListAlt className="h-5 w-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleToggleAll}
            >
              {allColumnsVisible ? 'Ocultar todos' : 'Mostrar todos'}
            </button>
            {filteredColumns.map((column) => (
              <button
                key={column.id}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleSelectionChange(column.id)}
              >
                {typeof column.columnDef.header === 'function'
                  ? column.columnDef.header()
                  : column.columnDef.header}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TableColumnVisible
