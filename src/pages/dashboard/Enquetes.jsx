import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, PieChart } from 'lucide-react'
import EnqueteCard from '../../components/dashboard/EnqueteCard'
import api from '../../services/api'

const Enquetes = () => {
  const [enquetes, setEnquetes] = useState([])

  useEffect(() => {
    loadEnquetes()
  }, [])

  const loadEnquetes = async () => {
    const response = await api.get('/polls')
    setEnquetes(response.data.polls)
  }

  return (
    <div className="min-h-screen bg-dark-base text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-white/60 hover:text-primary-500 mb-6">
          <ArrowLeft size={18} /> Voltar ao Dashboard
        </Link>

        <h1 className="font-serif text-3xl mb-8 flex items-center gap-3">
          <PieChart className="text-primary-500" size={32} />
          Enquetes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enquetes.map(enquete => (
            <EnqueteCard key={enquete._id} enquete={enquete} onVotar={loadEnquetes} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Enquetes