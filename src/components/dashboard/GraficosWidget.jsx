import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, PieChart, TrendingUp, Users, Calendar } from 'lucide-react';
import api from '../../services/api';

const GraficosWidget = () => {
  const [stats, setStats] = useState({
    totalEventos: 0,
    totalParticipantes: 0,
    eventosPorMes: [],
    segmentos: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [eventsRes, usersRes] = await Promise.all([
        api.get('/events'),
        api.get('/auth/users?role=empreendedora')
      ]);

      // Processar dados para gráficos
      const eventos = eventsRes.data.events;
      const usuarios = usersRes.data.users;

      // Calcular estatísticas básicas
      const totalEventos = eventos.length;
      const totalParticipantes = usuarios.length;

      // Agrupar eventos por mês
      const eventosPorMes = {};
      eventos.forEach(event => {
        const mes = new Date(event.data).toLocaleString('pt-BR', { month: 'short' });
        eventosPorMes[mes] = (eventosPorMes[mes] || 0) + 1;
      });

      // Agrupar usuários por segmento
      const segmentos = {};
      usuarios.forEach(user => {
        if (user.segmento) {
          segmentos[user.segmento] = (segmentos[user.segmento] || 0) + 1;
        }
      });

      setStats({
        totalEventos,
        totalParticipantes,
        eventosPorMes: Object.entries(eventosPorMes).map(([mes, count]) => ({ mes, count })),
        segmentos: Object.entries(segmentos).map(([nome, count]) => ({ nome, count }))
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-glass rounded-2xl p-6 border border-white/10">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-1/3"></div>
          <div className="h-32 bg-white/5 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-glass rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-2 mb-6">
        <BarChart className="text-primary-500" size={24} />
        <h2 className="font-serif text-xl">Estatísticas</h2>
      </div>

      {/* Cards de números */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-primary-500/10 rounded-xl p-4 border border-primary-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-primary-500" />
            <span className="text-white/60 text-sm">Eventos</span>
          </div>
          <p className="font-serif text-3xl text-white">{stats.totalEventos}</p>
        </div>

        <div className="bg-neon-pink/10 rounded-xl p-4 border border-neon-pink/20">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-neon-pink" />
            <span className="text-white/60 text-sm">Empreendedoras</span>
          </div>
          <p className="font-serif text-3xl text-white">{stats.totalParticipantes}</p>
        </div>
      </div>

      {/* Gráfico de eventos por mês (barras simples) */}
      {stats.eventosPorMes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white/70 text-sm mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-primary-500" />
            Eventos por mês
          </h3>
          <div className="space-y-2">
            {stats.eventosPorMes.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-white/40 text-xs w-16">{item.mes}</span>
                <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-neon-pink"
                    style={{ width: `${(item.count / Math.max(...stats.eventosPorMes.map(e => e.count))) * 100}%` }}
                  />
                </div>
                <span className="text-white/40 text-xs w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gráfico de segmentos (barras) */}
      {stats.segmentos.length > 0 && (
        <div>
          <h3 className="text-white/70 text-sm mb-3 flex items-center gap-2">
            <PieChart size={14} className="text-primary-500" />
            Segmentos mais comuns
          </h3>
          <div className="space-y-2">
            {stats.segmentos.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-white/40 text-xs truncate w-24">{item.nome}</span>
                <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-pink to-primary-500"
                    style={{ width: `${(item.count / Math.max(...stats.segmentos.map(s => s.count))) * 100}%` }}
                  />
                </div>
                <span className="text-white/40 text-xs w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GraficosWidget;