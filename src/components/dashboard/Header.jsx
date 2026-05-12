import React from 'react'
import { Bell, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="h-20 border-b border-white/10 flex items-center justify-between px-8">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-white/60 hover:text-primary-500 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full border-2 border-primary-500/30"
          />
          <div>
            <p className="text-sm text-white">{user?.name}</p>
            <p className="text-xs text-white/40">{user?.segmento}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header