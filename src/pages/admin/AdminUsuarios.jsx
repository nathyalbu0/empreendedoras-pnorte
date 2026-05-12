import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  Download,
  Filter,
  X,
  Save,
  ChevronDown,
  ChevronUp,
  BarChart,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroRole, setFiltroRole] = useState('todos');
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    segmento: '',
    role: 'empreendedora'
  });

  useEffect(() => {
    carregarUsuarios();
    carregarStats();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await api.get('/users');
      setUsuarios(response.data.users);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarStats = async () => {
    try {
      const response = await api.get('/users/stats/overview');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const handleEdit = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone || '',
      cidade: usuario.cidade || '',
      segmento: usuario.segmento || '',
      role: usuario.role
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${usuarioEditando._id}`, formData);
      await carregarUsuarios();
      setShowEditModal(false);
      setUsuarioEditando(null);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/users/${id}`);
        await carregarUsuarios();
        await carregarStats();
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert('Erro ao deletar usuário');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const segmentos = [
    'Moda Feminina', 'Moda Infantil', 'Brechó', 'Artesanato',
    'Gastronomia', 'Doces e Salgados', 'Acessórios', 'Bolsas',
    'Cosméticos', 'Produtos Naturais', 'Brinquedos', 'Serviços Criativos'
  ];

  const usuariosFiltrados = usuarios.filter(usuario => {
    const matchesSearch = usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filtroRole === 'todos' || usuario.role === filtroRole;
    return matchesSearch && matchesRole;
  });

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-dark-base text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Users className="text-primary-500" size={32} />
            <div>
              <h1 className="font-serif text-3xl">Gerenciar Usuários</h1>
              <p className="text-white/40">Visualize e gerencie todas as empreendedoras</p>
            </div>
          </div>
          <button
            onClick={() => setShowStats(!showStats)}
            className="px-4 py-2 bg-primary-500/20 text-primary-500 rounded-lg hover:bg-primary-500/30 transition-colors flex items-center gap-2"
          >
            <BarChart size={18} />
            <span>{showStats ? 'Ocultar Estatísticas' : 'Ver Estatísticas'}</span>
          </button>
        </div>

        {/* Estatísticas */}
        {showStats && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary-500/10 to-neon-pink/10 rounded-2xl p-6 border border-primary-500/20 mb-8"
          >
            <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
              <PieChartIcon size={20} className="text-primary-500" />
              Estatísticas do Sistema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-sm mb-1">Total de Usuários</p>
                <p className="font-serif text-3xl text-white">{stats.total}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-sm mb-1">Empreendedoras</p>
                <p className="font-serif text-3xl text-primary-500">{stats.empreendedoras}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-sm mb-1">Administradoras</p>
                <p className="font-serif text-3xl text-neon-pink">{stats.admins}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-sm mb-1">Segmentos</p>
                <p className="font-serif text-3xl text-white">{stats.segmentos?.length || 0}</p>
              </div>
            </div>

            {stats.segmentos && stats.segmentos.length > 0 && (
              <div>
                <h3 className="text-white/70 text-sm mb-3">Segmentos mais comuns</h3>
                <div className="space-y-2">
                  {stats.segmentos.map((seg, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-white/40 text-sm w-32 truncate">{seg._id || 'Não informado'}</span>
                      <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-neon-pink"
                          style={{ width: `${(seg.count / stats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-white/40 text-sm w-12">{seg.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Busca e Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-500/50"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFiltroRole('todos')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                filtroRole === 'todos'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <Users size={16} />
              Todos
            </button>
            <button
              onClick={() => setFiltroRole('empreendedora')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                filtroRole === 'empreendedora'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <User size={16} />
              Empreendedoras
            </button>
            <button
              onClick={() => setFiltroRole('admin')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                filtroRole === 'admin'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <Shield size={16} />
              Admins
            </button>
          </div>
        </div>

        {/* Lista de Usuários */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Carregando usuários...</p>
          </div>
        ) : usuariosFiltrados.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-lg">Nenhum usuário encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {usuariosFiltrados.map((usuario) => (
              <motion.div
                key={usuario._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary-500/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      usuario.role === 'admin' 
                        ? 'bg-gradient-to-r from-primary-500 to-neon-pink' 
                        : 'bg-primary-500/20'
                    }`}>
                      {usuario.nome?.charAt(0)}
                    </div>

                    {/* Informações */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-medium text-lg">{usuario.nome}</h3>
                        {usuario.role === 'admin' ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-primary-500/20 text-primary-500 border border-primary-500/20 flex items-center gap-1">
                            <Shield size={12} />
                            Admin
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">
                            Empreendedora
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-white/40">
                          <Mail size={14} />
                          <span className="truncate">{usuario.email}</span>
                        </div>
                        {usuario.telefone && (
                          <div className="flex items-center gap-2 text-white/40">
                            <Phone size={14} />
                            <span>{usuario.telefone}</span>
                          </div>
                        )}
                        {usuario.cidade && (
                          <div className="flex items-center gap-2 text-white/40">
                            <MapPin size={14} />
                            <span>{usuario.cidade}</span>
                          </div>
                        )}
                        {usuario.segmento && (
                          <div className="flex items-center gap-2 text-white/40">
                            <ShoppingBag size={14} />
                            <span>{usuario.segmento}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-xs">
                        <span className="text-white/30 flex items-center gap-1">
                          <Calendar size={12} />
                          Cadastro: {formatarData(usuario.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(usuario)}
                      className="p-2 text-white/40 hover:text-primary-500 transition-colors bg-white/5 rounded-lg hover:bg-white/10"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(usuario._id)}
                      className="p-2 text-white/40 hover:text-red-500 transition-colors bg-white/5 rounded-lg hover:bg-white/10"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal de Edição */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-base rounded-2xl w-full max-w-lg border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-white">Editar Usuário</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Telefone</label>
                  <input
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Segmento</label>
                  <select
                    name="segmento"
                    value={formData.segmento}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  >
                    <option value="">Selecione um segmento</option>
                    {segmentos.map((seg) => (
                      <option key={seg} value={seg}>{seg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Tipo de Usuário</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  >
                    <option value="empreendedora">Empreendedora</option>
                    <option value="admin">Administradora</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    <span>Salvar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsuarios;