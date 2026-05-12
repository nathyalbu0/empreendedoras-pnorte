import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, ChevronRight } from 'lucide-react'
import EnqueteCard from './EnqueteCard'
import api from '../../services/api'

const EnquetesWidget = () => {
  const [enquetes, setEnquetes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEnquetes()
  }, [])

  const loadEnquetes = async () => {
    try {
      const response = await api.get('/polls')
      setEnquetes(response.data.polls.slice(0, 3))
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-glass rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PieChart className="text-primary-500" size={24} />
          <h2 className="font-serif text-xl">Enquetes</h2>
        </div>
        <Link to="/dashboard/enquetes" className="text-primary-500 hover:text-neon-pink flex items-center gap-1">
          Ver todas <ChevronRight size={16} />
        </Link>
      </div>

      {enquetes.length === 0 ? (
        <p className="text-white/40 text-center py-4">Nenhuma enquete ativa</p>
      ) : (
        <div className="space-y-4">
          {enquetes.map(enquete => (
            <EnqueteCard key={enquete._id} enquete={enquete} onVotar={loadEnquetes} />
          ))}
        </div>
      )}
    </div>
  )
}

export default EnquetesWidget