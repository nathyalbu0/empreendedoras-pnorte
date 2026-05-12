import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react'
import api from '../../services/api'

const AdminEnquetes = () => {
  const [enquetes, setEnquetes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    pergunta: '',
    opcoes: ['', ''],
    multiplaEscolha: false
  })

  useEffect(() => {
    loadEnquetes()
  }, [])

  const loadEnquetes = async () => {
    const response = await api.get('/polls/admin')
    setEnquetes(response.data.polls)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const opcoesValidas = formData.opcoes.filter(o => o.trim() !== '')
    
    await api.post('/polls', {
      pergunta: formData.pergunta,
      opcoes: opcoesValidas,
      multiplaEscolha: formData.multiplaEscolha
    })
    
    setShowForm(false)
    loadEnquetes()
  }

  const handleDelete = async (id) => {
    if (window.confirm('Excluir enquete?')) {
      await api.delete(`/polls/${id}`)
      loadEnquetes()
    }
  }

  return (
    <div className="min-h-screen bg-dark-base text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-white/60 hover:text-primary-500 mb-6">
          <ArrowLeft size={18} /> Voltar
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl">Gerenciar Enquetes</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 flex items-center gap-2"
          >
            <Plus size={18} /> Nova Enquete
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-xl mb-8">
            <input
              type="text"
              placeholder="Pergunta"
              value={formData.pergunta}
              onChange={(e) => setFormData({...formData, pergunta: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 mb-4"
              required
            />
            
            {formData.opcoes.map((opcao, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Opção ${index + 1}`}
                value={opcao}
                onChange={(e) => {
                  const novasOpcoes = [...formData.opcoes]
                  novasOpcoes[index] = e.target.value
                  setFormData({...formData, opcoes: novasOpcoes})
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 mb-2"
                required
              />
            ))}
            
            <button
              type="button"
              onClick={() => setFormData({...formData, opcoes: [...formData.opcoes, '']})}
              className="text-primary-500 mb-4"
            >
              + Adicionar opção
            </button>

            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.multiplaEscolha}
                  onChange={(e) => setFormData({...formData, multiplaEscolha: e.target.checked})}
                />
                <span>Permitir múltipla escolha</span>
              </label>
            </div>

            <button type="submit" className="px-6 py-2 bg-primary-500 rounded-lg">
              Salvar
            </button>
          </form>
        )}

        <div className="space-y-4">
          {enquetes.map(enquete => (
            <div key={enquete._id} className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-medium">{enquete.pergunta}</h3>
                <p className="text-sm text-white/40">{enquete.opcoes.length} opções • {enquete.votantes?.length || 0} votos</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:text-primary-500"><Edit size={18} /></button>
                <button onClick={() => handleDelete(enquete._id)} className="p-2 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminEnquetes