import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle, Clock, MessageCircle } from 'lucide-react'
import InscricaoForm from '../components/forms/InscricaoForm'

const SejaEmpreendedora = () => {
  const [showForm, setShowForm] = useState(false)

  const passos = [
    { icon: CheckCircle, texto: 'Preencha o formulário de inscrição' },
    { icon: Clock, texto: 'Aguarde nosso contato (até 3 dias)' },
    { icon: MessageCircle, texto: 'Participe de uma conversa com a equipe' },
    { icon: ArrowRight, texto: 'Pronta para começar a empreender!' }
  ]

  return (
    <div className="bg-dark-base text-white pt-20">
      {/* Hero Section - Simples e direta */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm mb-6"
          >
            <Sparkles size={16} />
            <span>Inscrições abertas</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Faça parte das <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-neon-pink">Empreendedoras P.Norte</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-8"
          >
            Preencha o formulário abaixo e comece sua jornada com a gente.
          </motion.p>
        </div>
      </section>

      {/* Passos rápidos */}
      <section className="py-12 bg-dark-deeper">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {passos.map((passo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-2">
                  <passo.icon size={20} className="text-primary-500" />
                </div>
                <p className="text-white/70 text-xs">{passo.texto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Inscrição */}
      <InscricaoForm onVoltar={() => setShowForm(false)} />
    </div>
  )
}

export default SejaEmpreendedora