import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  PieChart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/dashboard' },
    { icon: Calendar, label: 'Agenda', path: '/dashboard/agenda' },
    { icon: FileText, label: 'Documentos', path: '/dashboard/documentos' },
    { icon: PieChart, label: 'Enquetes', path: '/dashboard/enquetes' },
    { icon: Users, label: 'Rede de Apoio', path: '/dashboard/rede' },
    { icon: Settings, label: 'Configurações', path: '/dashboard/configuracoes' },
  ];

  const sidebarVariants = {
    open: { width: 280, transition: { duration: 0.3, ease: 'easeInOut' } },
    closed: { width: 80, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const mobileSidebarVariants = {
    closed: { x: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } },
    open: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary-500 text-white rounded-lg shadow-soft"
        aria-label="Toggle sidebar"
      >
        {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarOpen ? 'open' : 'closed'}
        initial="open"
        className="fixed left-0 top-0 h-full bg-white shadow-soft hidden lg:block z-40"
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-neutral-100">
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-serif text-xl font-bold bg-gold-gradient bg-clip-text text-transparent"
              >
                P.NORTE
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <ChevronRight
              size={20}
              className={`transform transition-transform ${
                !sidebarOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-medium text-neutral-900">{user?.name}</p>
                  <p className="text-xs text-neutral-500">{user?.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-500'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <item.icon size={20} />
                <AnimatePresence mode="wait">
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-600 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <LogOut size={20} />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  Sair
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              variants={mobileSidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-soft z-40 lg:hidden"
            >
              {/* Similar content to desktop sidebar but simplified */}
              <div className="h-20 flex items-center px-4 border-b border-neutral-100">
                <span className="font-serif text-xl font-bold bg-gold-gradient bg-clip-text text-transparent">
                  P.NORTE
                </span>
              </div>

              <div className="p-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-neutral-900">{user?.name}</p>
                    <p className="text-xs text-neutral-500">{user?.role}</p>
                  </div>
                </div>
              </div>

              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-600 hover:bg-neutral-100"
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-600 hover:bg-red-50 hover:text-red-500"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-medium">Sair</span>
                </button>
              </nav>
            </motion.div>
            
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-20'
        }`}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;