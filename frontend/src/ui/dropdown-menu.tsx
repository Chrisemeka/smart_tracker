  import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
  import { ChevronDownIcon, Settings, LogOut, User, } from 'lucide-react'
  import type { UserData } from '../utils/types'  
import { jwtDecode } from "jwt-decode";


  export default function DropdownMenu() {
    const user = JSON.parse(localStorage.getItem('user')!) as UserData
    const handleLogout = async () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')

      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, { method: 'POST' })

      window.location.href = '/login'
    }

    const accessToken = localStorage.getItem('accessToken')
    const userName = accessToken ? jwtDecode<{ name?: string }>(accessToken).name : null;

    return (
      <Menu as="div" className="relative inline-block">
        <MenuButton className="inline-flex w-full items-center justify-center gap-x-2 rounded-md bg-white/10 px-3 py-2 text-smx font-semibold text-black inset-ring-1 inset-ring-white/5 hover:bg-white/20">
          <div className='flex flex-row gap-3 items-center justify-center'>
              <img alt="User Image" className="w-8 h-8 rounded-full" src={user?.profilePictureUrl ?? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLWljb24gbHVjaWRlLWNpcmNsZS11c2VyIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiLz48cGF0aCBkPSJNNyAyMC42NjJWMTlhMiAyIDAgMCAxIDItMmg2YTIgMiAwIDAgMSAyIDJ2MS42NjIiLz48L3N2Zz4='} />
              <p>{user?.name ?? userName ?? 'John Doe'}</p>
          </div>
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>

        <MenuItems
          transition
          className="bg-white px-1 border border-gray-200 shadow-md absolute right-0 z-10 mt-2 w-60 origin-top-right divide-y divide-white/10 rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                className="block flex flex-row items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-500 data-focus:bg-gray-700/5 data-focus:text-gray-700 data-focus:outline-hidden"
              >
                  <User className='size-4'/>
                Profile
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block flex flex-row items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-500 data-focus:bg-gray-700/5 data-focus:text-gray-700 data-focus:outline-hidden"
              >
                  <Settings className='size-4'/>
                Settings
              </a>
            </MenuItem>
          </div>
          <MenuSeparator className="my-1 h-px bg-gray-200" />
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                className="block flex flex-row items-center gap-3 rounded-md px-4 py-2 text-sm text-red-500 data-focus:bg-gray-700/5 data-focus:text-gray-700 data-focus:outline-hidden"
                onClick={handleLogout}
              >
                  <LogOut className='size-4'/>
                Log out
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    )
  }
