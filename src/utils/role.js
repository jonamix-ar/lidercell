export const roleMapping = {
  admin: 'Administrador',
  user: 'Cliente',
  wholesaler: 'Mayorista'
}

export const getRoleName = (roleValue) => {
  return roleMapping[roleValue] || roleValue
}
