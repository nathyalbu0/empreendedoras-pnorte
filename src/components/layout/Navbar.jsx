import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'História', path: '/institucional' },
  { name: 'Empreendedoras', path: '/para-empreendedoras' },  // ← ADICIONE
  { name: 'Galeria', path: '/galeria' },  // ← ADICIONE
  { name: 'Parceiros', path: '/parceiros' },
]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-dark-base/80 backdrop-blur-lg border-b border-white/10 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo e Studio Nébula */}
          <div className="flex items-center gap-4">
            <Link to="/" className="relative group">
              <span className="font-serif text-2xl bg-gradient-to-r from-primary-500 to-neon-pink bg-clip-text text-transparent">
                 E.P.N.
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-neon-pink group-hover:w-full transition-all duration-300" />
            </Link>
            <span className="hidden md:block text-xs text-white/30 tracking-widest border-l border-white/10 pl-4">
              NEBULA STUDIO
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary-500 relative group ${
                  location.pathname === item.path ? 'text-primary-500' : 'text-white/70'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-neon-pink group-hover:w-full transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : ''
                }`} />
              </Link>
            ))}
          </div>
{/* Desktop Actions */}
<div className="hidden md:flex items-center space-x-4">
  <Link to="/login">
    <button className="px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-primary-500/50 transition-all text-sm flex items-center gap-2">
      <User size={16} className="text-primary-500" />
      <span>Área da Empreendedora</span>
    </button>
  </Link>
  
  {/* BOTÃO ROSA COM LINK - AGORA VAI FUNCIONAR */}
  <Link to="/seja-empreendedora">
    <button className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all text-sm">
      Seja uma Empreendedora
    </button>
  </Link>
</div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-primary-500 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-base/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="mb-4 pb-4 border-b border-white/10">
                <span className="text-xs text-white/30 tracking-widest">STUDIO NÉBULA</span>
              </div>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-white/70 hover:text-primary-500 border-b border-white/10 last:border-0"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 space-y-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <User size={16} className="text-primary-500" />
                    <span>Área da Empreendedora</span>
                  </button>
                </Link>
                {/* Botão Seja uma Empreendedora - ROSA COM LINK */}
<Link to="/seja-empreendedora">
  <button className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all text-sm">
    Seja uma Empreendedora
  </button>
</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar