import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa'

const TablePagination = ({ table }) => {
  return (
    <div className="flex items-center space-x-1">
      <button
        className="cursor-pointer rounded border border-gray-4-300 p-1.5 hover:bg-gray hover:bg-gray focus:border-blue-500 focus:ring-blue-500 dark:border-gray-4-600 dark:bg-gray-4-700 dark:text-white dark:focus:border-blue-50 dark:focus:ring-blue-500"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        className="flex cursor-pointer items-center rounded border border-gray-4-300 p-1 hover:bg-gray hover:bg-gray focus:border-blue-500 focus:ring-blue-500 dark:border-gray-4-600 dark:bg-gray-4-700 dark:text-white dark:focus:border-blue-50 dark:focus:ring-blue-500"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <FaAngleLeft className="mr-1" />{' '}
        <span className="text-sm">Anterior</span>
      </button>

      <button
        className="flex cursor-pointer items-center rounded border border-gray-4-300 p-1 hover:bg-gray hover:bg-gray focus:border-blue-500 focus:ring-blue-500 dark:border-gray-4-600 dark:bg-gray-4-700 dark:text-white dark:focus:border-blue-50 dark:focus:ring-blue-500"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="text-sm">Siguiente</span>
        <FaAngleRight className="ms-1" />
      </button>
      <button
        className="cursor-pointer rounded border border-gray-4-300 p-1.5 hover:bg-gray hover:bg-gray focus:border-blue-500 focus:ring-blue-500 dark:border-gray-4-600 dark:bg-gray-4-700 dark:text-white dark:focus:border-blue-50 dark:focus:ring-blue-500"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  )
}

export default TablePagination
