import React from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Users } from 'lucide-react'

const Institucional = () => {
  return (
    <div className="bg-dark-base text-white pt-20">
      {/* Hero Institucional */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-neon-pink">História</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto"
          >
            Conheça a trajetória das EMPREENDEDORAS P.NORTE e como estamos transformando vidas através do empreendedorismo feminino.
          </motion.p>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20 bg-dark-deeper">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Missão',
                description: 'Empoderar mulheres empreendedoras através de capacitação, rede de apoio e acesso a oportunidades.',
                color: 'from-pink-500 to-purple-500'
              },
              {
                icon: Eye,
                title: 'Visão',
                description: 'Ser referência em empreendedorismo feminino na região Norte, impactando mais de 1000 mulheres até 2026.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Heart,
                title: 'Valores',
                description: 'Sororidade, inovação social, transparência, diversidade e impacto sustentável.',
                color: 'from-pink-500 to-neon-pink'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-primary-500/50 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-4xl text-center text-white mb-16">Nossa <span className="text-primary-500">Jornada</span></h2>
          <div className="max-w-3xl mx-auto">
            {[
              { year: '2023', title: 'Fundação', description: 'Empreendedoras P.NORTE nasce do sonho de Brisa Snatana em criar uma rede de apoio para mulheres empreendedoras.' },
              { year: '2024', title: 'Primeiro edital', description: 'Lançamos nosso primeiro edital e selecionamos 50 mulheres para capacitação.' },
              { year: '2025', title: 'Expansão', description: 'Chegamos a 120 empreendedoras e 8 cidades da região Norte.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-primary-500 font-serif text-2xl">{item.year}</span>
                </div>
                <div className="flex-grow pb-8 border-l-2 border-white/10 pl-6 relative">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-neon-pink" />
                  <h3 className="font-serif text-xl text-white mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Institucional