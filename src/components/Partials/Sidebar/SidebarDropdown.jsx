import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const SidebarDropdown = ({ item, pageName, setPageName }) => {
  const handleClick = (label) => {
    const updatedPageName =
      pageName !== label.toLowerCase() ? label.toLowerCase() : ''
    setPageName(updatedPageName)
  }

  return (
    <ul
      className={`translate transform overflow-hidden ${pageName === item.label?.toLowerCase() ? 'h-auto' : 'h-0'}`}
    >
      {item.children.map((child, index) => (
        <li key={index}>
          <Link
            to={child.route}
            onClick={() => handleClick(child.label)}
            className="group relative flex items-center gap-2.5 rounded-sm px-10 py-2 font-normal text-sm text-slate-200 duration-300 ease-in-out hover:bg-gray-600 dark:hover:bg-[#313d4a]"
          >
            <FiChevronRight />
            {child.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SidebarDropdown
