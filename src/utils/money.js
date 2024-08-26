export const money = (value) => {
  const money = Number(value)

  if (isNaN(money)) {
    return value
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(money)
}

export const moneyArs = (value) => {
  const money = Number(value)

  if (isNaN(money)) {
    return value
  }

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(money)
}

export const numeroALetras = (numero) => {
  const unidades = [
    '',
    'Uno',
    'Dos',
    'Tres',
    'Cuatro',
    'Cinco',
    'Seis',
    'Siete',
    'Ocho',
    'Nueve'
  ]
  const decenas = [
    'Diez',
    'Veinte',
    'Treinta',
    'Cuarenta',
    'Cincuenta',
    'Sesenta',
    'Setenta',
    'Ochenta',
    'Noventa'
  ]
  const especiales = [
    'Once',
    'Doce',
    'Trece',
    'Catorce',
    'Quince',
    'Dieciséis',
    'Diecisiete',
    'Dieciocho',
    'Diecinueve'
  ]
  const centenas = [
    '',
    'Ciento',
    'Doscientos',
    'Trescientos',
    'Cuatrocientos',
    'Quinientos',
    'Seiscientos',
    'Setecientos',
    'Ochocientos',
    'Novecientos'
  ]

  const convertirGrupo = (n) => {
    let output = ''

    if (n === 100) {
      return 'Cien'
    }

    if (n > 99) {
      output += centenas[Math.floor(n / 100)] + ' '
      n %= 100
    }

    if (n >= 11 && n <= 19) {
      output += especiales[n - 11] + ' '
      return output.trim()
    }

    if (n > 9) {
      output += decenas[Math.floor(n / 10) - 1] + ' '
      n %= 10
    }

    if (n > 0) {
      output += unidades[n] + ' '
    }

    return output.trim()
  }

  const [parteEntera, parteDecimal] = numero.toFixed(2).split('.')
  let resultado = ''

  if (parseInt(parteEntera) === 0) {
    resultado = 'Cero'
  } else {
    const grupos = []
    for (let i = parteEntera.length; i > 0; i -= 3) {
      grupos.unshift(parseInt(parteEntera.slice(Math.max(0, i - 3), i)))
    }

    if (grupos.length > 2) {
      const millones = convertirGrupo(grupos[grupos.length - 3])
      if (millones !== '') {
        resultado +=
          millones +
          (grupos[grupos.length - 3] === 1 ? ' Millón ' : ' Millones ')
      }
    }

    if (grupos.length > 1) {
      const miles = convertirGrupo(grupos[grupos.length - 2])
      if (miles !== '') {
        resultado += miles + ' Mil '
      }
    }

    const unidadesFinal = convertirGrupo(grupos[grupos.length - 1])
    if (unidadesFinal !== '') {
      resultado += unidadesFinal
    }
  }

  resultado += ` Dólares ${parteDecimal}/100`

  return resultado.trim()
}
