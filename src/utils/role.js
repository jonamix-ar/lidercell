export const roleMapping = {
  admin: 'Administrador',
  customer: 'Cliente',
  wholesaler: 'Mayorista'
}

export const getRoleName = (roleValue) => {
  return roleMapping[roleValue] || roleValue
}
