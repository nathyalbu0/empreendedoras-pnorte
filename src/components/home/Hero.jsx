import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../ui/Button'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-deep">
      {/* Partículas */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-500/30 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/90 mb-8">
            <Sparkles size={16} className="text-pink-400" />
            <span className="text-sm">Empoderamento feminino • Inovação social</span>
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-6xl md:text-8xl text-white mb-6"
        >
          Transformando
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
            sonhos em negócios
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-white/60 mb-12 max-w-2xl mx-auto"
        >
          Uma comunidade que acolhe, capacita e conecta mulheres empreendedoras 
          com tecnologia e inovação social.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all">
            Explorar projeto
          </button>
          <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-white/10 transition-all">
            Área da empreendedora
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
