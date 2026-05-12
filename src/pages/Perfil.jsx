import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag,
  Calendar,
  Edit,
  Save,
  X,
  Sparkles
} from 'lucide-react';

const Perfil = () => {
  const { user, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    telefone: user?.telefone || '',
    cidade: user?.cidade || '',
    segmento: user?.segmento || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-dark-base text-white pt-20">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm mb-4">
              <Sparkles size={14} />
              <span>Meu Perfil</span>
            </div>
            <h1 className="font-serif text-3xl text-white mb-2">
              Olá, <span className="text-primary-500">{user.nome}</span>!
            </h1>
            <p className="text-white/50">Gerencie suas informações pessoais</p>
          </motion.div>

          {/* Card do Perfil */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10"
          >
            {/* Avatar */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-neon-pink flex items-center justify-center">
                  <span className="text-4xl">👩‍💼</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary-500 rounded-full p-2">
                  <User size={16} className="text-white" />
                </div>
              </div>
            </div>

            {isEditing ? (
              // Formulário de edição
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Segmento</label>
                  <input
                    type="text"
                    name="segmento"
                    value={formData.segmento}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500/50 transition-colors"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    <span>Salvar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </form>
            ) : (
              // Visualização do perfil
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail size={18} className="text-primary-500" />
                      <span className="text-white/70 text-sm">E-mail</span>
                    </div>
                    <p className="text-white">{user.email}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone size={18} className="text-primary-500" />
                      <span className="text-white/70 text-sm">Telefone</span>
                    </div>
                    <p className="text-white">{user.telefone || 'Não informado'}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={18} className="text-primary-500" />
                      <span className="text-white/70 text-sm">Cidade</span>
                    </div>
                    <p className="text-white">{user.cidade || 'Não informado'}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <ShoppingBag size={18} className="text-primary-500" />
                      <span className="text-white/70 text-sm">Segmento</span>
                    </div>
                    <p className="text-white">{user.segmento || 'Não informado'}</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar size={18} className="text-primary-500" />
                    <span className="text-white/70 text-sm">Membro desde</span>
                  </div>
                  <p className="text-white">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Edit size={18} />
                  <span>Editar perfil</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;