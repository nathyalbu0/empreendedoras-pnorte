import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, ChevronRight } from 'lucide-react';
import api from '../../services/api';

const DocumentosWidget = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDocumentos();
  }, []);

  const carregarDocumentos = async () => {
    try {
      const response = await api.get('/documents');
      setDocumentos(response.data.documents.slice(0, 4)); // Mostra só os 4 primeiros
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

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getIconByType = (tipo) => {
    switch(tipo) {
      case 'PDF': return '📄';
      case 'XLSX': return '📊';
      case 'DOCX': return '📝';
      default: return '📁';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-glass rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="text-primary-500" size={24} />
          <h2 className="font-serif text-xl">Documentos</h2>
        </div>
        <Link 
          to="/dashboard/documentos" 
          className="text-primary-500 hover:text-neon-pink transition-colors flex items-center gap-1 text-sm"
        >
          Ver todos
          <ChevronRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-16 bg-white/5 rounded-xl"></div>
          ))}
        </div>
      ) : documentos.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/40">Nenhum documento disponível</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documentos.map((doc) => (
            <div
              key={doc._id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getIconByType(doc.tipo)}</span>
                <div>
                  <p className="text-white text-sm">{doc.nome}</p>
                  <p className="text-white/40 text-xs">{formatBytes(doc.tamanho)}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(doc._id, doc.url)}
                className="text-white/30 hover:text-primary-500 transition-colors"
                title="Download"
              >
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentosWidget;