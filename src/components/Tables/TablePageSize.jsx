const TablePageSize = ({ table }) => {
  return (
    <select
      className="bg-gray-4-100 text-gray-900 block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-50 dark:focus:ring-blue-500"
      value={table.getState().pagination.pageSize}
      onChange={(e) => {
        table.setPageSize(Number(e.target.value))
      }}
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Mostrar {pageSize} filas
        </option>
      ))}
    </select>
  )
}

export default TablePageSize
