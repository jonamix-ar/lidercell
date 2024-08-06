const Badge = ({ type, children, className }) => {
  const baseClasses = 'px-2 py-1 rounded-full text-white font-semibold'
  let typeClasses = ''

  switch (type) {
    case 'primary':
      typeClasses = 'bg-blue-500'
      break
    case 'secondary':
      typeClasses = 'bg-gray-500'
      break
    case 'danger':
      typeClasses = 'bg-red-500'
      break
    case 'success':
      typeClasses = 'bg-green-500'
      break
    case 'warning':
      typeClasses = 'bg-yellow-500'
      break
    // Agrega más casos según sea necesario
    default:
      typeClasses = 'bg-gray-500' // Default case
  }

  return (
    <span className={`${baseClasses} ${typeClasses} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
