import { useState } from 'react'
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import TableEmpty from './TableEmpty'
import TableInfo from './TableInfo'
import TablePagination from './TablePagination'
import TableSelected from './TableSelected'
import TableSearch from './TableSearch'
import TableColumnVisible from './TableColumnVisible'
import TablePageSize from './TablePageSize'

const TableData = ({ data, columns }) => {
  const [selectedId, setSelectedId] = useState(null)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnVisibility,
      columnFilters,
      globalFilter,
      pagination
    },
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination
  })

  return (
    <>
      <div className="max-full overflow-x-auto rounded-lg">
        <div className="flex items-center justify-between p-4">
          <TableSearch
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <div className="flex items-center space-x-2">
            <TablePageSize table={table} />
            <TableColumnVisible table={table} />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`whitespace-pre-line p-4 font-medium text-black dark:text-white`}
                    style={{
                      minWidth: header.getSize() ? header.getSize() : 0
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽'
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#eee] px-4 py-2.5 text-left text-[#4A5568] dark:border-strokedark"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-pre-line p-4 text-sm font-normal capitalize text-black dark:text-white"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ) : (
              <TableEmpty
                description={`Esta lista no contiene información`}
                colspan={columns.length}
              />
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between p-4">
        <div>
          <TableInfo
            first={table.getState().pagination.pageIndex + 1}
            show={table.getState().pagination.pageSize}
            total={table.getFilteredRowModel().rows.length}
          />

          <TableSelected
            rowSelection={rowSelection}
            total={table.getPageCount()}
          />
        </div>
        <div>
          <TablePagination table={table} />
        </div>
      </div>
    </>
  )
}

export default TableData
