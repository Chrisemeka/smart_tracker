import DropdownMenu  from '../../ui/dropdown-menu'
import { Search, Database } from 'lucide-react'

  interface SearchTermProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

export function Header({ searchTerm, setSearchTerm }: SearchTermProps) {
  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-slate-700 to-slate-900 rounded-md flex items-center justify-center">
                <Database className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">TrackSpace</h1>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-80 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                    className="pl-10 flex h-9 w-full rounded-md bg-gray-50 px-3 py-1 text-sm text-black transition-colors placeholder:text-gray-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search across all buckets...'
                />
            </div>
          </div>

          {/* User Profile */}
          <DropdownMenu />
        </div>
      </div>
    </header>
  )
}