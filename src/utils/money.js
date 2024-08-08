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
