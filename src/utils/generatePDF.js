import jsPDF from 'jspdf'
import { money, numeroALetras } from './money'
import logo from '../assets/images/logo/logo.png'

export const generatePDF = (sale) => {
  const doc = new jsPDF('p', 'pt', 'a4')

  // Configuración de márgenes y espacios
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const marginX = 40
  const contentWidth = pageWidth - 2 * marginX
  const startX = marginX
  const startY = 40
  const lineHeight = 15

  // Función para dibujar un rectángulo redondeado
  const roundedRect = (x, y, w, h, r) => {
    doc.roundedRect(x, y, w, h, r, r)
  }

  // Logo de la empresa (reemplaza con la ruta correcta de tu logo)
  doc.addImage(logo, 'PNG', startX, startY, 180, 50)

  // Información de la empresa
  // doc.setFontSize(12)
  // doc.setFont('helvetica', 'bold')
  // doc.text('LIDERCELL', startX + 60, startY + 60)

  // doc.setFontSize(9)
  // doc.setFont('helvetica', 'normal')
  // doc.text('CUIT: 2147483647', startX + 60, startY + 35)
  // doc.text('Dirección: 25 de Mayo 2890', startX + 60, startY + 40)
  // doc.text('Teléfono: 930766011', startX + 60, startY + 60)
  // doc.text('Email: ventas@lidercell.com', startX + 60, startY + 75)

  // Información de la factura
  roundedRect(pageWidth - 200, startY, 160, 50, 5)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(`Factura N° : ${sale.receipts}`, pageWidth - 190, startY + 20)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(
    `FECHA ${new Date(sale.date).toLocaleDateString()}`,
    pageWidth - 190,
    startY + 35
  )
  // doc.text('2024-08-25', pageWidth - 190, startY + 50)

  // Información del cliente
  const clientStartY = startY + 100
  roundedRect(startX, clientStartY, contentWidth, 80, 5)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('CLIENTE', startX + 10, clientStartY + 20)

  const profile = sale.customer.profiles[0] || {}

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`${sale.customer.name}`, startX + 10, clientStartY + 35)
  doc.text(
    `${profile.address || 'Sin dirección'} - ${profile.state?.name || 'Sin localidad'} ${profile.locality?.name || 'Sin localidad'}`,
    startX + 10,
    clientStartY + 50
  )
  doc.text(
    `${profile.document_type || 'Sin documento'}: ${profile.document_number}`,
    startX + 10,
    clientStartY + 65
  )
  doc.text(
    `Correo electrónico: ${sale.customer.email}`,
    startX + 200,
    clientStartY + 50
  )
  doc.text(`Teléfono: ${sale.customer.phone}`, startX + 200, clientStartY + 65)

  // Tabla de productos
  const tableStartY = clientStartY + 100
  roundedRect(
    startX,
    tableStartY,
    contentWidth,
    pageHeight - tableStartY - 150,
    5
  )

  // Encabezado de la tabla
  // doc.setFillColor(255, 255, 255)
  // doc.rect(startX, tableStartY, contentWidth, 25, 'F')

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('CODIGO', startX + 10, tableStartY + 15)
  doc.text('DESCRIPCION', startX + 80, tableStartY + 15)
  doc.text('CANTIDAD', startX + 200, tableStartY + 15)
  doc.text('P.U.', startX + 300, tableStartY + 15)
  doc.text('DSCTO', startX + 380, tableStartY + 15)
  doc.text('SUBTOTAL', startX + 460, tableStartY + 15)

  // Detalles del producto
  let yPosition = tableStartY + 40
  let totalAmount = 0

  if (Array.isArray(sale.SaleDetail)) {
    sale.SaleDetail.forEach((item, index) => {
      const productCode = item.product?.sku || 'Código no disponible'
      const productName = item.product?.name || 'Producto no disponible'
      const productQty = item.qty || '0'
      const productPrice = money(item.price)
      const productDiscount = '0.00' // Aquí podrías integrar un campo de descuento si es necesario
      const productSubtotal = money(item.total)

      totalAmount += parseFloat(item.total)

      doc.setFont('helvetica', 'normal')
      doc.text(productCode, startX + 10, yPosition)
      doc.text(productName, startX + 80, yPosition)
      doc.text(productQty.toString(), startX + 200, yPosition)
      doc.text(productPrice.toString(), startX + 300, yPosition)
      doc.text(productDiscount, startX + 380, yPosition)
      doc.text(productSubtotal.toString(), startX + 460, yPosition)

      yPosition += lineHeight
    })
  }

  // Total en letras
  roundedRect(startX, pageHeight - 140, contentWidth, 30, 5)
  doc.setFontSize(9)
  doc.text('Total en letras:', startX + 10, pageHeight - 120)
  doc.setFont('helvetica', 'bold')
  doc.text(numeroALetras(totalAmount), startX + 80, pageHeight - 120)

  // Totales
  roundedRect(startX, pageHeight - 100, contentWidth, 60, 5)
  doc.setFont('helvetica', 'normal')
  doc.text('SUBTOTAL', startX + 350, pageHeight - 80)
  doc.text('IVA 0.00 %', startX + 350, pageHeight - 65)
  doc.text('TOTAL A PAGAR', startX + 350, pageHeight - 50)

  doc.setFont('helvetica', 'bold')
  doc.text(`${money(totalAmount)}`, startX + 440, pageHeight - 80)
  doc.text('0.00', startX + 440, pageHeight - 65)
  doc.text(`${money(totalAmount)}`, startX + 440, pageHeight - 50)

  // Guardar el archivo PDF
  doc.save(`factura-${sale.receipts}.pdf`)
}
