import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

const eventos = [
  {
    id: 1,
    titulo: 'Feira Empreendedoras P.NORTE',
    data: '15 Mar 2024',
    hora: '09:00',
    local: 'Ceilândia Norte',
    participantes: 45,
    status: 'confirmado'
  },
  {
    id: 2,
    titulo: 'Oficina de Precificação',
    data: '20 Mar 2024',
    hora: '14:00',
    local: 'Online (Zoom)',
    participantes: 30,
    status: 'pendente'
  },
  {
    id: 3,
    titulo: 'Reunião de Organização',
    data: '25 Mar 2024',
    hora: '19:00',
    local: 'Grupo WhatsApp',
    participantes: 120,
    status: 'confirmado'
  },
  {
    id: 4,
    titulo: 'Feira Noturna',
    data: '28 Mar 2024',
    hora: '18:00',
    local: 'Ceilândia Sul',
    participantes: 60,
    status: 'pendente'
  }
]

const AgendaWidget = () => {
  const getStatusColor = (status) => {
    return status === 'confirmado' 
      ? 'text-green-500 bg-green-500/10 border-green-500/20' 
      : 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-glass rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="text-primary-500" size={24} />
          <h2 className="font-serif text-xl">Próximos Eventos</h2>
        </div>
        <button className="text-primary-500 text-sm hover:text-neon-pink transition-colors">
          Ver todos
        </button>
      </div>

      <div className="space-y-4">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-white">{evento.titulo}</h3>
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(evento.status)}`}>
                {evento.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm text-white/60 mb-3">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{evento.data} às {evento.hora}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{evento.local}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-white/40">
                <Users size={14} />
                {evento.participantes} participantes
              </span>
              <button className="text-primary-500 hover:text-neon-pink text-sm">
                Confirmar
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default AgendaWidget