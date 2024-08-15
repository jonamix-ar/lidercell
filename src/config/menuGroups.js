import {
  FiMonitor,
  FiLayers,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
  FiSettings,
  FiLayout,
  FiBarChart,
  FiHelpCircle
} from 'react-icons/fi'

const menuGroups = [
  {
    name: 'Menú',
    menuItems: [
      { icon: FiMonitor, label: 'Escritorio', route: 'dashboard' },
      {
        icon: FiLayers,
        label: 'Almacen',
        route: '#',
        children: [
          { label: 'Productos', route: 'products' },
          { label: 'Categorías', route: 'categories' },
          { label: 'Marcas', route: 'brands' }
        ]
      },
      {
        icon: FiShoppingBag,
        label: 'Compras',
        route: '#',
        children: [
          { label: 'Ingresos', route: '#' },
          { label: 'Proveedores', route: '#' }
        ]
      },
      {
        icon: FiShoppingCart,
        label: 'Ventas',
        route: '#',
        children: [
          { label: 'Nueva venta', route: 'sales' },
          { label: 'Ventas', route: '#' },
          { label: 'Clientes', route: '#' }
        ]
      },
      { icon: FiUser, label: 'Usuarios', route: 'users' },
      { icon: FiSettings, label: 'Configuración', route: '#' }
    ]
  },
  {
    name: 'Reportes',
    menuItems: [
      { icon: FiBarChart, label: 'Gráficos', route: '#' },
      {
        icon: FiShoppingBag,
        label: 'Consulta de compras',
        route: '#',
        children: [
          { label: 'Compras por fechas', route: '#' },
          { label: 'Compras articulos', route: '#' }
        ]
      },
      {
        icon: FiLayout,
        label: 'Consulta Ventas',
        route: '#',
        children: [
          { label: 'Consulta Ventas', route: '#' },
          { label: 'Ventas articulo', route: '#' }
        ]
      },
      { icon: FiHelpCircle, label: 'Ayuda', route: '#' }
    ]
  }
]

export default menuGroups
