import { FaBarsStaggered } from 'react-icons/fa6'
import LogoLidercell from '../../common/LogoLidercell'
import { Link } from 'react-router-dom'
import DropdownUser from '../../Dropdowns/DropdownUser'

const Navigation = ({ user, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-[#24303f] dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-[#24303f] dark:bg-[#24303f] lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="flex items-center justify-center right-0 h-full w-full">
                <FaBarsStaggered className="w-5 h-5 text-slate-600 dark:text-white" />
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <LogoLidercell
              color={'#000'}
              colorSecondary={'#fff'}
              stroke={'#000'}
              className={'w-[165px] h-[35px]'}
              alt="Logo Lidercell"
              title="Logo Lidercell"
            />
          </Link>
        </div>
        <div className="hidden sm:block"></div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4"></ul>
          <DropdownUser user={user} />
        </div>
      </div>
    </header>
  )
}

export default Navigation
