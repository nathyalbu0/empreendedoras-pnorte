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
  ArrowRight,
  Target,
  Clock,
  Award
} from 'lucide-react'
import { Link } from 'react-router-dom'

const ParaEmpreendedoras = () => {
  const segmentos = [
    'Moda Feminina', 'Moda Infantil', 'Brechó', 'Artesanato',
    'Gastronomia', 'Doces e Salgados', 'Acessórios', 'Bolsas',
    'Cosméticos', 'Produtos Naturais', 'Brinquedos', 'Serviços Criativos'
  ]

  const beneficios = [
    {
      icon: ShoppingBag,
      title: 'Espaço para vendas',
      description: 'Local estruturado e organizado para comercializar seus produtos'
    },
    {
      icon: Users,
      title: 'Divulgação coletiva',
      description: 'Marketing compartilhado nas redes sociais do grupo'
    },
    {
      icon: Heart,
      title: 'Rede de apoio',
      description: 'Sororidade e troca de experiências entre empreendedoras'
    },
    {
      icon: Award,
      title: 'Participação em editais',
      description: 'Acesso a oportunidades e projetos maiores'
    },
    {
      icon: Star,
      title: 'Capacitações',
      description: 'Oficinas de precificação, marketing e atendimento'
    },
    {
      icon: Target,
      title: 'Fortalecimento da marca',
      description: 'Visibilidade e credibilidade no mercado local'
    }
  ]

  const requisitos = [
    'Ser mulher, maior de 18 anos',
    'Ter produto ou serviço próprio',
    'Disponibilidade para participar das feiras',
    'Aceitar as regras de organização coletiva',
    'Ter estrutura própria (mesa, cadeira)',
    'Participar do grupo oficial',
    'Responder enquetes organizacionais',
    'Cumprir horários e regras'
  ]

  const atividades = [
    {
      icon: Calendar,
      title: 'Feiras semanais',
      description: 'Organização de feiras todos os fins de semana'
    },
    {
      icon: Clock,
      title: 'Planejamento coletivo',
      description: 'Reuniões de organização e alinhamento'
    },
    {
      icon: Users,
      title: 'Rede de apoio',
      description: 'Grupo de WhatsApp e encontros presenciais'
    }
  ]

  return (
    <div className="bg-dark-base text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm mb-6"
          >
            <Sparkles size={16} />
            <span>Para mulheres que querem crescer juntas</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Para <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-neon-pink">Empreendedoras</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/60 max-w-3xl mx-auto mb-8"
          >
            Tudo o que você precisa saber para fazer parte do P.NORTE e transformar seu negócio com a força do coletivo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/seja-empreendedora">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all inline-flex items-center gap-2">
                <span>Quero participar</span>
                <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Números */}
      <section className="py-20 bg-dark-deeper">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-glass rounded-2xl p-8 text-center border border-white/10"
            >
              <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <div className="font-serif text-4xl text-white mb-2">120+</div>
              <p className="text-white/60">Empreendedoras ativas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-glass rounded-2xl p-8 text-center border border-white/10"
            >
              <ShoppingBag className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <div className="font-serif text-4xl text-white mb-2">12+</div>
              <p className="text-white/60">Segmentos diferentes</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-glass rounded-2xl p-8 text-center border border-white/10"
            >
              <Calendar className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <div className="font-serif text-4xl text-white mb-2">48+</div>
              <p className="text-white/60">Feiras realizadas</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl mb-4">
              Benefícios de <span className="text-primary-500">participar</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Ao fazer parte do P.NORTE, você tem acesso a diversas vantagens que vão fortalecer seu negócio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-glass rounded-xl p-6 border border-white/10 hover:border-primary-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
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
            <h2 className="font-serif text-4xl mb-4">
              Segmentos <span className="text-primary-500">atendidos</span>
            </h2>
            <p className="text-white/60">Diversidade de produtos e serviços</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {segmentos.map((segmento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-glass rounded-xl p-4 text-center border border-white/10 hover:border-primary-500/50 transition-all"
              >
                <p className="text-white/80 text-sm">{segmento}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos e Atividades */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Requisitos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-glass rounded-2xl p-8 border border-white/10"
            >
              <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-2">
                <CheckCircle className="text-primary-500" />
                Requisitos para participar
              </h3>
              <ul className="space-y-3">
                {requisitos.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Sparkles size={16} className="text-primary-500 flex-shrink-0 mt-1" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Atividades */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-glass rounded-2xl p-8 border border-white/10"
            >
              <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-2">
                <Calendar className="text-primary-500" />
                Atividades do grupo
              </h3>
              <div className="space-y-4">
                {atividades.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-primary-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-white font-medium mb-3">Capacitações oferecidas:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Precificação', 'Marketing Digital', 'Atendimento', 'Finanças', 'Fotografia'].map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-500 text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary-600/20 to-neon-pink/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-4xl text-white mb-4">
              Pronta para <span className="text-primary-500">começar?</span>
            </h2>
            <p className="text-white/60 mb-8">
              Junte-se a mais de 120 mulheres que já estão transformando seus negócios com o apoio do coletivo.
            </p>
            <Link to="/seja-empreendedora">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all">
                Quero fazer parte
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ParaEmpreendedoras