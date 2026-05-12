import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, BarChart } from 'lucide-react'
import api from '../../services/api'

const EnqueteCard = ({ enquete, onVotar }) => {
  const [votando, setVotando] = useState(false)
  const [selecionada, setSelecionada] = useState(null)
  const [resultados, setResultados] = useState(enquete.opcoes)
  const [jaVotou, setJaVotou] = useState(false)

  const totalVotos = resultados.reduce((acc, opcao) => acc + opcao.votos, 0)

  const handleVotar = async () => {
    if (selecionada === null) return

    setVotando(true)
    try {
      const response = await api.post(`/polls/${enquete._id}/votar`, {
        opcoesIndices: [selecionada]
      })
      
      setResultados(response.data.poll.opcoes)
      setJaVotou(true)
      onVotar?.()
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao votar')
    } finally {
      setVotando(false)
    }
  }

  const calcularPorcentagem = (votos) => {
    return totalVotos > 0 ? Math.round((votos / totalVotos) * 100) : 0
  }

  return (
    <div className="bg-white/5 backdrop-blur-glass rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-medium text-lg mb-4">{enquete.pergunta}</h3>

      <div className="space-y-3 mb-4">
        {resultados.map((opcao, index) => {
          const porcentagem = calcularPorcentagem(opcao.votos)

          return (
            <button
              key={index}
              onClick={() => !jaVotou && setSelecionada(index)}
              disabled={jaVotou}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/70 text-sm">{opcao.texto}</span>
                {jaVotou && (
                  <span className="text-white/40 text-sm">{opcao.votos} votos ({porcentagem}%)</span>
                )}
              </div>
              {jaVotou ? (
                <div className="h-8 bg-white/5 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-neon-pink"
                    style={{ width: `${porcentagem}%` }}
                  />
                </div>
              ) : (
                <div className={`h-8 rounded-lg border-2 transition-colors ${
                  selecionada === index 
                    ? 'border-primary-500 bg-primary-500/10' 
                    : 'border-white/10 bg-white/5'
                }`} />
              )}
            </button>
          )
        })}
      </div>

      {!jaVotou ? (
        <button
          onClick={handleVotar}
          disabled={votando || selecionada === null}
          className="w-full py-3 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-xl hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {votando ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Votando...</span>
            </>
          ) : (
            <>
              <BarChart size={18} />
              <span>Votar</span>
            </>
          )}
        </button>
      ) : (
        <div className="text-center text-primary-500 text-sm flex items-center justify-center gap-2">
          <CheckCircle size={16} />
          <span>Voto computado!</span>
        </div>
      )}
    </div>
  )
}

export default EnqueteCard