import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Calendar, 
  FileText, 
  PieChart,
  Users,
  Shield,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // ← IMPORTAR!
import AgendaAdmin from './AgendaAdmin';

const AdminPanel = () => {
  const { user } = useAuth();
  const [showAgendaAdmin, setShowAgendaAdmin] = useState(false);
  const navigate = useNavigate(); // ← ADICIONAR!

  // Só admin vê este painel
  if (user?.role !== 'admin') return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500/20 to-neon-pink/20 backdrop-blur-glass rounded-2xl p-6 border border-primary-500/30 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield className="text-primary-500" size={24} />
          <h2 className="font-serif text-xl text-white">Painel Administrativo</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Botão AGENDA - abre modal */}
          <button
            onClick={() => setShowAgendaAdmin(true)}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center group"
          >
            <Calendar className="w-6 h-6 text-primary-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white/70 text-sm">Gerenciar Agenda</span>
          </button>

          {/* Botão DOCUMENTOS - vai para página */}
          <button
            onClick={() => navigate('/dashboard/admin/documentos')}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center group"
          >
            <FileText className="w-6 h-6 text-primary-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white/70 text-sm">Documentos</span>
          </button>

          {/* Botão ENQUETES - vai para página */}
          <button
            onClick={() => navigate('/dashboard/admin/enquetes')}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center group"
          >
            <PieChart className="w-6 h-6 text-primary-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white/70 text-sm">Enquetes</span>
          </button>

          {/* Botão USUÁRIOS - vai para página */}
          <button
            onClick={() => navigate('/dashboard/admin/usuarios')}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center group"
          >
            <Users className="w-6 h-6 text-primary-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white/70 text-sm">Usuários</span>
          </button>
        </div>
      </motion.div>

      {showAgendaAdmin && (
        <AgendaAdmin onClose={() => setShowAgendaAdmin(false)} />
      )}
    </>
  );
};

export default AdminPanel;