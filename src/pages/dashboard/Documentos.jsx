import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Documentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoria, setCategoria] = useState('todos');

  useEffect(() => {
    carregarDocumentos();
  }, []);

  const carregarDocumentos = async () => {
    try {
      const response = await api.get('/documents');
      setDocumentos(response.data.documents);
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id, url) => {
    try {
      await api.post(`/documents/${id}/download`);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Erro ao registrar download:', error);
      window.open(url, '_blank');
    }
  };

  const getIconByType = (tipo) => {
    switch(tipo) {
      case 'PDF': return '📄';
      case 'XLSX': return '📊';
      case 'DOCX': return '📝';
      case 'PNG': return '🖼️';
      case 'JPG': return '📸';
      default: return '📁';
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const categorias = [
    { id: 'todos', nome: 'Todos' },
    { id: 'manual', nome: 'Manuais' },
    { id: 'regulamento', nome: 'Regulamentos' },
    { id: 'formulario', nome: 'Formulários' },
    { id: 'material', nome: 'Material de Apoio' },
    { id: 'edital', nome: 'Editais' }
  ];

  const documentosFiltrados = documentos.filter(doc => {
    const matchesSearch = doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = categoria === 'todos' || doc.categoria === categoria;
    return matchesSearch && matchesCategoria;
  });

  return (
    <div className="min-h-screen bg-dark-base text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-white/60 hover:text-primary-500 mb-6">
          <ArrowLeft size={18} />
          <span>Voltar ao Dashboard</span>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-primary-500" size={32} />
          <div>
            <h1 className="font-serif text-3xl">Documentos</h1>
            <p className="text-white/40">Acesse manuais, regulamentos e materiais de apoio</p>
          </div>
        </div>

        {/* Busca e Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-500/50"
            />
          </div>
          <div className="flex gap-2">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  categoria === cat.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Documentos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Carregando documentos...</p>
          </div>
        ) : documentosFiltrados.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-lg">Nenhum documento encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {documentosFiltrados.map((doc) => (
              <motion.div
                key={doc._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary-500/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{getIconByType(doc.tipo)}</div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{doc.nome}</h3>
                      {doc.descricao && (
                        <p className="text-white/60 text-sm mb-2">{doc.descricao}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-white/40">
                          📁 {doc.categoria}
                        </span>
                        <span className="text-white/40">
                          📊 {formatBytes(doc.tamanho)}
                        </span>
                        <span className="text-white/40 flex items-center gap-1">
                          <Download size={12} />
                          {doc.downloads || 0} downloads
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(doc._id, doc.url)}
                    className="p-3 bg-primary-500/20 text-primary-500 rounded-lg hover:bg-primary-500/30 transition-colors group-hover:scale-110 transform"
                    title="Download"
                  >
                    <Download size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documentos;