import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  CheckCircle, 
  Gift, 
  ShoppingBag, 
  Calendar,
  Sparkles,
  Heart,
  Star,
  ArrowRight
} from 'lucide-react'

const Participar = () => {
  const segments = [
    'Moda feminina', 'Moda infantil', 'Brechó', 'Artesanato',
    'Gastronomia', 'Doces e salgados', 'Acessórios', 'Bolsas',
    'Cosméticos', 'Produtos naturais', 'Brinquedos', 'Serviços criativos'
  ]

  const benefits = [
    'Espaço organizado para vendas',
    'Divulgação coletiva',
    'Fortalecimento da marca',
    'Apoio em grupo',
    'Participação em eventos estruturados',
    'Possibilidade de participar de projetos maiores (editais e emendas)'
  ]

  const criteria = [
    'Participar do grupo oficial',
    'Responder enquetes organizacionais',
    'Pagar taxa de participação quando houver evento',
    'Ter estrutura própria (mesa, cadeira e, quando necessário, tenda)',
    'Não repetir nicho já ocupado (quando o espaço for limitado)',
    'Cumprir horários e regras'
  ]

  return (
    <div className="bg-dark-base text-white pt-20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Para <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-neon-pink">Empreendedoras</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto"
          >
            Faça parte de uma rede de apoio e oportunidades para mulheres empreendedoras da periferia
          </motion.p>
        </div>
      </section>

      {/* Números */}
      <section className="py-20 bg-dark-deeper">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 text-center border border-white/10"
            >
              <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <div className="font-serif text-5xl text-white mb-2">120+</div>
              <p className="text-white/60">Empreendedoras ativas</p>
              <p className="text-white/40 text-sm mt-2">Média por evento</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 text-center border border-white/10"
            >
              <Calendar className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <div className="font-serif text-5xl text-white mb-2">2023</div>
              <p className="text-white/60">Ano de fundação</p>
              <p className="text-white/40 text-sm mt-2">3+ anos de história</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quem pode participar */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="font-serif text-4xl text-white mb-4">
              Quem pode <span className="text-primary-500">participar?</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10">
            <ul className="space-y-4">
              {[
                'Mulheres empreendedoras',
                'Maiores de 18 anos',
                'Que atuem com produtos ou serviços próprios',
                'Que aceitem as regras de organização coletiva'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-white/80"
                >
                  <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Segmentos */}
      <section className="py-20 bg-dark-deeper">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <ShoppingBag className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h2 className="font-serif text-4xl text-white mb-4">
              Segmentos <span className="text-primary-500">atendidos</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-glass rounded-xl p-4 text-center border border-white/10 hover:border-primary-500/50 transition-all"
              >
                <p className="text-white/80 text-sm">{segment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Critérios */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Critérios para entrar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-2xl text-white">Critérios para entrar</h3>
              </div>
              <ul className="space-y-3">
                {criteria.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/70">
                    <Sparkles size={16} className="text-primary-500 flex-shrink-0 mt-1" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefícios */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-neon-pink flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-2xl text-white">Benefícios</h3>
              </div>
              <ul className="space-y-3">
                {benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/70">
                    <Star size={16} className="text-primary-500 flex-shrink-0 mt-1" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* O que oferecemos */}
      <section className="py-20 bg-dark-deeper">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl text-white mb-4">
              O que o <span className="text-primary-500">projeto oferece</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10"
            >
              <h3 className="font-serif text-2xl text-white mb-4 flex items-center gap-2">
                <Calendar className="text-primary-500" size={24} />
                Atividades
              </h3>
              <ul className="space-y-3">
                {[
                  'Organização de feiras semanais',
                  'Espaço estruturado para vendas',
                  'Planejamento coletivo',
                  'Divulgação nas redes sociais',
                  'Rede de apoio entre empreendedoras'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/70">
                    <Heart size={16} className="text-primary-500 flex-shrink-0 mt-1" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10"
            >
              <h3 className="font-serif text-2xl text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-primary-500" size={24} />
                Capacitações
              </h3>
              <ul className="space-y-3">
                {[
                  'Oficinas de precificação',
                  'Atendimento ao cliente',
                  'Marketing digital',
                  'Organização de bancada',
                  'Educação financeira'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/70">
                    <Star size={16} className="text-primary-500 flex-shrink-0 mt-1" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-4xl text-white mb-6">
              Pronta para <span className="text-primary-500">crescer junto?</span>
            </h2>
            <p className="text-white/60 mb-8">
              Faça parte dessa rede de apoio e transforme seu negócio com a força do coletivo.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all inline-flex items-center gap-2">
              <span>Quero participar</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Participar