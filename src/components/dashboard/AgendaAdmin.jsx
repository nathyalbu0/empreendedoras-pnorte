import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Save,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import api from '../../services/api';

const AgendaAdmin = ({ onClose }) => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data: '',
    hora: '',
    local: '',
    tipo: 'evento',
    maxParticipantes: ''
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data.events);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
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
    try {
      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, formData);
      } else {
        await api.post('/events', formData);
      }
      
      loadEvents();
      setShowForm(false);
      setEditingEvent(null);
      setFormData({
        titulo: '',
        descricao: '',
        data: '',
        hora: '',
        local: '',
        tipo: 'evento',
        maxParticipantes: ''
      });
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      titulo: event.titulo,
      descricao: event.descricao,
      data: event.data.split('T')[0],
      hora: event.hora || '',
      local: event.local,
      tipo: event.tipo,
      maxParticipantes: event.maxParticipantes || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await api.delete(`/events/${id}`);
        loadEvents();
      } catch (error) {
        console.error('Erro ao deletar evento:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark-base rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Calendar className="text-primary-500" size={24} />
            <h2 className="font-serif text-2xl text-white">Gerenciar Agenda</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              <span>Novo Evento</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          {showForm ? (
            // Formulário de evento
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="bg-white/5 rounded-xl p-6 space-y-4"
            >
              <h3 className="text-lg text-white mb-4">
                {editingEvent ? 'Editar Evento' : 'Novo Evento'}
              </h3>

              <div>
                <label className="block text-white/70 text-sm mb-2">Título *</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Data *</label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Hora</label>
                  <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Local *</label>
                <input
                  type="text"
                  name="local"
                  value={formData.local}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Tipo</label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  >
                    <option value="evento">Evento</option>
                    <option value="feira">Feira</option>
                    <option value="capacitacao">Capacitação</option>
                    <option value="reuniao">Reunião</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Máx. Participantes</label>
                  <input
                    type="number"
                    name="maxParticipantes"
                    value={formData.maxParticipantes}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary-500/50"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  <span>Salvar</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
                  }}
                  className="px-4 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.form>
          ) : (
            // Lista de eventos
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white/60">Carregando eventos...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">Nenhum evento cadastrado</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Criar primeiro evento
                  </button>
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-primary-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">{event.titulo}</h4>
                        <p className="text-white/60 text-sm mt-1">{event.descricao}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 text-white/60 hover:text-primary-500 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="p-2 text-white/60 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white/40">
                        <Calendar size={14} />
                        <span>{formatDate(event.data)}</span>
                      </div>
                      {event.hora && (
                        <div className="flex items-center gap-2 text-white/40">
                          <Clock size={14} />
                          <span>{event.hora}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-white/40">
                        <MapPin size={14} />
                        <span>{event.local}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Users size={14} className="text-white/40" />
                      <span className="text-white/40 text-sm">
                        {event.participantes?.length || 0} participantes
                      </span>
                      {event.maxParticipantes && (
                        <span className="text-white/40 text-sm">
                          / {event.maxParticipantes} máximo
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AgendaAdmin;