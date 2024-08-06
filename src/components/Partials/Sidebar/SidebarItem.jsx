import { Link, useLocation } from 'react-router-dom'
import SidebarDropdown from './SidebarDropdown'

const SidebarItem = ({ item, pageName, setPageName }) => {
  const { pathname } = useLocation()

  const isActive = (item) => {
    if (!item) return false
    if (item.route === pathname) return true
    if (item.children) {
      return item.children.some((child) => isActive(child))
    }
    return false
  }

  const isItemActive = isActive(item)
  const isItemPageActive = pageName === item.label.toLowerCase()

  const handleClick = () => {
    if (!item?.label) return

    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : ''
    setPageName(updatedPageName)
  }

  return (
    <>
      <li>
        <Link
          to={item.route}
          onClick={handleClick}
          className={`${isItemActive ? 'bg-[#333a48] dark:bg-[#313d4a]' : ''} group relative flex items-center gap-2.5 rounded-sm px-5 py-2 font-medium text-slate-200 duration-300 ease-in-out hover:bg-[#333a48] dark:hover:bg-[#313d4a]`}
        >
          <item.icon />
          {item.label}
          {item.children && (
            <svg
              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                pageName === item.label?.toLowerCase() && 'rotate-180'
              }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76377 15.5896 8.0892L10.5896 13.0892C10.2641 13.4146 9.73651 13.4146 9.41107 13.0892L4.41107 8.0892C4.08563 7.76377 4.08563 7.23614 4.41107 6.9107Z"
                fill=""
              />
            </svg>
          )}
        </Link>
        {item.children && (
          <SidebarDropdown
            item={item}
            pageName={pageName}
            setPageName={setPageName}
          />
        )}
      </li>
    </>
  )
}

export default SidebarItem
