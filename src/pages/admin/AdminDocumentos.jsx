import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Save,
  Download,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminDocumentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: 'PDF',
    tamanho: '',
    url: '',
    categoria: 'manual',
    visivelPara: 'todas'
  });

  useEffect(() => {
    carregarDocumentos();
  }, []);

  const carregarDocumentos = async () => {
    try {
      const response = await api.get('/documents/admin');
      setDocumentos(response.data.documents);
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingDoc) {
        await api.put(`/documents/${editingDoc._id}`, formData);
      } else {
        await api.post('/documents', formData);
      }
      
      await carregarDocumentos();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar documento:', error);
      alert('Erro ao salvar documento');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (doc) => {
    setEditingDoc(doc);
    setFormData({
      nome: doc.nome,
      descricao: doc.descricao || '',
      tipo: doc.tipo,
      tamanho: doc.tamanho,
      url: doc.url,
      categoria: doc.categoria,
      visivelPara: doc.visivelPara
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este documento?')) {
      try {
        await api.delete(`/documents/${id}`);
        await carregarDocumentos();
      } catch (error) {
        console.error('Erro ao deletar documento:', error);
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingDoc(null);
    setFormData({
      nome: '',
      descricao: '',
      tipo: 'PDF',
      tamanho: '',
      url: '',
      categoria: 'manual',
      visivelPara: 'todas'
    });
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

  return (
    <div className="min-h-screen bg-dark-base text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FileText className="text-primary-500" size={32} />
            <div>
              <h1 className="font-serif text-3xl">Gerenciar Documentos</h1>
              <p className="text-white/40">Upload e gerenciamento de arquivos</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Novo Documento</span>
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-glass rounded-2xl p-6 border border-white/10 mb-8"
          >
            <h2 className="text-xl text-white mb-4 font-serif">
              {editingDoc ? '✏️ Editar Documento' : '📄 Novo Documento'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Nome do Arquivo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                    placeholder="Ex: Regulamento Geral.pdf"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Tipo</label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  >
                    <option value="PDF">PDF</option>
                    <option value="XLSX">Excel (XLSX)</option>
                    <option value="DOCX">Word (DOCX)</option>
                    <option value="PNG">PNG</option>
                    <option value="JPG">JPG</option>
                    <option value="TXT">Texto (TXT)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Descrição</label>
                <input
                  type="text"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  placeholder="Breve descrição do documento..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Tamanho (em bytes)</label>
                  <input
                    type="text"
                    name="tamanho"
                    value={formData.tamanho}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                    placeholder="Ex: 1048576 (1MB)"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">URL do Arquivo *</label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Categoria</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  >
                    <option value="manual">📖 Manual</option>
                    <option value="regulamento">📋 Regulamento</option>
                    <option value="formulario">📝 Formulário</option>
                    <option value="material">📚 Material de Apoio</option>
                    <option value="edital">📢 Edital</option>
                    <option value="outro">📁 Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Visibilidade</label>
                  <select
                    name="visivelPara"
                    value={formData.visivelPara}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  >
                    <option value="todas">👥 Todas (público)</option>
                    <option value="empreendedoras">👩‍💼 Apenas Empreendedoras</option>
                    <option value="admin">🔒 Apenas Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Salvar Documento</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Lista de Documentos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Carregando documentos...</p>
          </div>
        ) : documentos.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-lg mb-2">Nenhum documento cadastrado</p>
            <p className="text-white/30 text-sm mb-6">Comece fazendo upload do primeiro documento</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors inline-flex items-center gap-2"
            >
              <Upload size={18} />
              <span>Upload de Documento</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {documentos.map((doc) => (
              <motion.div
                key={doc._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary-500/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-3xl">{getIconByType(doc.tipo)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-medium">{doc.nome}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20">
                          {doc.tipo}
                        </span>
                        {doc.visivelPara !== 'todas' && (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 flex items-center gap-1">
                            {doc.visivelPara === 'admin' ? <EyeOff size={12} /> : <Eye size={12} />}
                            {doc.visivelPara === 'admin' ? 'Privado' : 'Empreendedoras'}
                          </span>
                        )}
                      </div>
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
                        <span className="text-white/40">
                          📅 {new Date(doc.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/40 hover:text-primary-500 transition-colors bg-white/5 rounded-lg hover:bg-white/10"
                      title="Download"
                      onClick={() => api.post(`/documents/${doc._id}/download`)}
                    >
                      <Download size={16} />
                    </a>
                    <button
                      onClick={() => handleEdit(doc)}
                      className="p-2 text-white/40 hover:text-primary-500 transition-colors bg-white/5 rounded-lg hover:bg-white/10"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(doc._id)}
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
      </div>
    </div>
  );
};

export default AdminDocumentos;