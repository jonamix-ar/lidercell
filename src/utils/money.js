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
