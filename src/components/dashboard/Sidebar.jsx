import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  PieChart, 
  Users,
  User, 
  Settings,
  LogOut 
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/dashboard' },
    { icon: Calendar, label: 'Agenda', path: '/dashboard/agenda' },
    { icon: FileText, label: 'Documentos', path: '/dashboard/documentos' },
    { icon: PieChart, label: 'Enquetes', path: '/dashboard/enquetes' },
    { icon: Users, label: 'Rede de Apoio', path: '/dashboard/rede' },
    { icon: User, label: 'Meu Perfil', path: '/perfil' },  // ← ADICIONE
    { icon: Settings, label: 'Configurações', path: '/dashboard/configuracoes' },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-dark-deeper border-r border-white/10 p-6">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/dashboard" className="font-serif text-2xl bg-gradient-to-r from-primary-500 to-neon-pink bg-clip-text text-transparent">
          P.NORTE
        </Link>
        <p className="text-white/30 text-xs mt-1">Área da Empreendedora</p>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-500/20 to-neon-pink/20 text-primary-500 border border-primary-500/20' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-500 transition-all"
      >
        <LogOut size={20} />
        <span className="text-sm">Sair</span>
      </button>
    </div>
  )
}

export default Sidebar