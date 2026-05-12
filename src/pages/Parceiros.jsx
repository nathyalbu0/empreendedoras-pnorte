import React from 'react'
import { motion } from 'framer-motion'
import { Award, Briefcase, Handshake } from 'lucide-react'

const Parceiros = () => {
  const partners = [
    { name: 'Tech Mulher', logo: '/images/partners/tech-mulher.png', category: 'Tecnologia' },
    { name: 'Banco do Brasil', logo: '/images/partners/bb.png', category: 'Financeiro' },
    { name: 'SEBRAE', logo: '/images/partners/sebrae.png', category: 'Capacitação' },
    { name: 'Governo do AM', logo: '/images/partners/governo.png', category: 'Público' },
    { name: 'Fundação Amazônia', logo: '/images/partners/fundacao.png', category: 'Social' },
    { name: 'Instituto Mulher', logo: '/images/partners/instituto.png', category: 'ONG' },
  ]

  return (
    <div className="bg-dark-base text-white pt-20">
      {/* Hero Parceiros */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-neon-pink">Parceiros</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto mb-12"
          >
            Juntos, construímos uma rede de apoio e oportunidades para mulheres empreendedoras.
          </motion.p>

          {/* Stats Parceiros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Award, value: '15+', label: 'Parceiros ativos' },
              { icon: Briefcase, value: '8', label: 'Editais realizados' },
              { icon: Handshake, value: 'R$ 2M', label: 'Em investimentos' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <stat.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <div className="font-serif text-2xl text-white">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Parceiros */}
      <section className="py-20 bg-dark-deeper">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all group"
              >
                <div className="w-20 h-20 bg-white/10 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="font-serif text-xl text-white mb-2">{partner.name}</h3>
                <p className="text-primary-500 text-sm mb-3">{partner.category}</p>
                <p className="text-white/50 text-sm">Parceiro desde 2024</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Parceiros */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-4xl text-white mb-6">
              Seja <span className="text-primary-500">parceiro</span> dessa transformação
            </h2>
            <p className="text-white/60 mb-8">
              Entre em contato e faça parte da nossa rede de apoio ao empreendedorismo feminino.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all">
              Quero ser parceiro
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Parceiros