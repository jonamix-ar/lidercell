export const formatDocumentType = (type) => {
  switch (type) {
    case 'dni':
      return 'DNI'
    case 'cuit-cuil':
      return 'CUIT/CUIL'
    case 'lc':
      return 'LC'
    case 'le':
      return 'LE'
    default:
      return 'Sin documento'
  }
}

export const formatReceipt = (text) => {
  if (/^[a-zA-Z]/.test(text)) {
    return text.charAt(0).toUpperCase()
  }
  return text
}

export const formatReceiptType = (type) => {
  switch (type) {
    case 'F':
      return 'Factura'
    case 'R':
      return 'Remito'
    case 'T':
      return 'Ticket'
    case 'B':
      return 'Boleta'
    default:
      return 'Sin tipo'
  }
}
