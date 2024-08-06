import clsx from 'clsx' // Importación por defecto para clsx
import { twMerge } from 'tailwind-merge' // Importación nombrada para twMerge

// Definición de la función cn
export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}
