import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Users, 
  Calendar, 
  Award, 
  MapPin,
  Heart,
  Sparkles,
  Briefcase,
  TrendingUp,
  Star,
  Target,
  Eye
} from 'lucide-react'
import Button from '../components/ui/Button'

const Home = () => {
  return (
    <div className="bg-dark-base text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-deep" />
        <div className="absolute inset-0 bg-gradient-hero animate-glow-pulse" />
        
        {/* Partículas */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-500/30 rounded-full animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-6xl md:text-8xl mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-primary-500 to-neon-pink bg-clip-text text-transparent">
                Empreendedoras
              </span>
              <br />
              <span className="relative">
                P.Norte
                <div className="absolute -inset-2 bg-primary-500/20 blur-2xl -z-10" />
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto italic"
            >
              "Quando uma mulher empreende sozinha, ela sobrevive. <br />
              <span className="text-primary-500 font-semibold">Quando empreende em grupo, ela cresce.</span>"
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all">
                Conheça nossa história
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-glass border border-white/10 text-white rounded-full hover:bg-white/10 transition-all">
                Quero participar
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="relative">
            <div className="w-6 h-10 border border-white/20 rounded-full backdrop-blur-sm flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-primary-500 to-neon-pink rounded-full mt-2" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Sobre o Projeto */}
      <section className="py-32 bg-dark-deeper relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-neon-pink font-medium uppercase tracking-wider mb-4 block">
              Nossa História
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">
              Fortalecendo mulheres da <span className="text-primary-500">periferia</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              O Empreendedoras P.Norte surgiu em 2023, idealizado por Brisa Santana, moradora da região norte de Ceilândia, 
              a partir da necessidade de fortalecer mulheres empreendedoras da periferia que trabalhavam de forma isolada 
              e sem oportunidades estruturadas de venda.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Muitas mulheres possuíam talento, mas não tinham espaço fixo para comercialização, organização coletiva, 
              apoio para divulgação e formação empreendedora. Assim nasceu a <span className="text-primary-500">Feira Empreendedoras P.Norte</span>, 
              com o propósito de unir, organizar e fortalecer economicamente mulheres da região.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fundadora - Brisa Santana */}
      <section className="py-32 bg-dark-base">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary-500/20 blur-3xl" />
              
              <div className="relative bg-white/5 backdrop-blur-glass rounded-3xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-96 md:h-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-neon-pink flex items-center justify-center">
                        <span className="text-5xl">👩🏽‍💼</span>
                      </div>
                      <h3 className="font-serif text-2xl text-white">Brisa Santana</h3>
                      <p className="text-primary-500">Fundadora</p>
                      <p className="text-white/40 text-sm mt-4">Ceilândia • Desde 2023</p>
                    </div>
                  </div>
                  
                  <div className="p-12 lg:p-16">
                    <span className="text-neon-pink font-medium uppercase tracking-wider mb-4 block">
                      Idealizadora
                    </span>
                    
                    <p className="text-white/70 leading-relaxed mb-6">
                      Empreendedora cultural e organizadora de feiras na região de Ceilândia, Brisa Santana atua há mais de 3 anos 
                      na organização de feiras coletivas femininas.
                    </p>
                    
                    <p className="text-white/70 leading-relaxed mb-6">
                      Criadora da Feira Empreendedoras P.NORTE e da Feira Noturna, desenvolve ações voltadas para economia criativa, 
                      empoderamento feminino, geração de renda e organização comunitária.
                    </p>
                    
                    <p className="text-white/50 text-sm italic">
                      "Sua trajetória é marcada pela persistência, liderança comunitária e construção de oportunidades 
                      para mulheres da periferia do Distrito Federal."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-32 bg-dark-deeper">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10 hover:border-primary-500/50 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Missão</h3>
              <p className="text-white/60 leading-relaxed">
                Fortalecer mulheres empreendedoras da periferia por meio da organização coletiva, 
                geração de renda, formação e valorização da economia criativa local.
              </p>
            </motion.div>

            {/* Visão */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10 hover:border-primary-500/50 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-neon-pink flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Visão</h3>
              <p className="text-white/60 leading-relaxed">
                Ser referência no Distrito Federal como tecnologia social de organização coletiva de mulheres empreendedoras, 
                ampliando para novas regiões administrativas e acessando políticas públicas, editais e parcerias institucionais.
              </p>
            </motion.div>

            {/* Valores */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10 hover:border-primary-500/50 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-neon-pink to-pink-500 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Valores</h3>
              <ul className="text-white/60 space-y-2">
                <li className="flex items-center gap-2">
                  <Sparkles size={14} className="text-primary-500" />
                  União, Respeito, Organização
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={14} className="text-primary-500" />
                  Comprometimento e Sororidade
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={14} className="text-primary-500" />
                  Valorização da mulher periférica
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={14} className="text-primary-500" />
                  Transparência
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={14} className="text-primary-500" />
                  Empreendedorismo com propósito
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home