const TableSearch = ({ globalFilter, setGlobalFilter }) => {
  return (
    <>
      <div className="flex items-center">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="bg-gray-4-100 text-gray-900 block w-100 rounded-lg border border-gray-4-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-4-600 dark:bg-gray-4-700 dark:text-white dark:placeholder-gray-4-400 dark:focus:border-blue-50 dark:focus:ring-blue-500"
          placeholder="Buscar..."
        />
      </div>
    </>
  )
}

export default TableSearch
