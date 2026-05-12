import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import AdminPanel from '../components/dashboard/AdminPanel'
import AgendaWidget from '../components/dashboard/AgendaWidget'
import DocumentosWidget from '../components/dashboard/DocumentosWidget'
import EnquetesWidget from '../components/dashboard/EnquetesWidget'
import GraficosWidget from '../components/dashboard/GraficosWidget'
import api from '../services/api'

const Dashboard = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    eventos: [],
    documentos: [],
    enquetes: [],
    stats: {}
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [eventosRes, documentosRes, enquetesRes] = await Promise.all([
        api.get('/events'),
        api.get('/documents'),
        api.get('/polls')
      ])

      setDashboardData({
        eventos: eventosRes.data.events || [],
        documentos: documentosRes.data.documents || [],
        enquetes: enquetesRes.data.polls || [],
        stats: {
          totalEventos: eventosRes.data.count || 0,
          totalDocumentos: documentosRes.data.count || 0,
          totalEnquetes: enquetesRes.data.count || 0
        }
      })
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-base text-white flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/60">Carregando dashboard...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-base text-white flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-serif text-3xl mb-2">
              Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-neon-pink">{user?.nome}</span>!
            </h1>
            <p className="text-white/60">Bem-vinda à sua área da empreendedora</p>
          </motion.div>

          {/* Cards de resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-primary-500/10 rounded-xl p-4 border border-primary-500/20">
              <p className="text-white/60 text-sm mb-1">Eventos</p>
              <p className="font-serif text-3xl text-white">{dashboardData.stats.totalEventos}</p>
            </div>
            <div className="bg-neon-pink/10 rounded-xl p-4 border border-neon-pink/20">
              <p className="text-white/60 text-sm mb-1">Documentos</p>
              <p className="font-serif text-3xl text-white">{dashboardData.stats.totalDocumentos}</p>
            </div>
            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
              <p className="text-white/60 text-sm mb-1">Enquetes</p>
              <p className="font-serif text-3xl text-white">{dashboardData.stats.totalEnquetes}</p>
            </div>
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
              <p className="text-white/60 text-sm mb-1">Sua participação</p>
              <p className="font-serif text-3xl text-white">85%</p>
            </div>
          </div>

          {/* Painel Admin (só aparece para admin) */}
          <AdminPanel onEventCreated={loadDashboardData} />

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráficos - 2 colunas */}
            <div className="lg:col-span-2">
              <GraficosWidget data={dashboardData} />
            </div>
            
            {/* Documentos - 1 coluna */}
            <div className="lg:col-span-1">
              <DocumentosWidget documentos={dashboardData.documentos} />
            </div>
            
            {/* Agenda - 2 colunas */}
            <div className="lg:col-span-2">
              <AgendaWidget eventos={dashboardData.eventos} onUpdate={loadDashboardData} />
            </div>
            
            {/* Enquetes - 1 coluna */}
            <div className="lg:col-span-1">
              <EnquetesWidget enquetes={dashboardData.enquetes} onUpdate={loadDashboardData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard