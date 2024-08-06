const TableSelected = ({ rowSelection, total }) => {
  return (
    <>
      {Object.keys(rowSelection).length > 0 && (
        <span className="ml-2">
          {Object.keys(rowSelection).length} filas seleccionadas de {total}
        </span>
      )}
    </>
  )
}

export default TableSelected
