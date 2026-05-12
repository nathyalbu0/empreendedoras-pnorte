import React from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5561984274912"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20" />
        <div className="absolute inset-0 bg-neon-pink rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
        
        <div className="relative bg-white/10 backdrop-blur-glass border border-primary-500/50 text-white p-4 rounded-full shadow-glow-pink">
          <MessageCircle size={28} className="text-primary-500" />
        </div>
        
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-dark-elevated/90 backdrop-blur-glass text-white text-sm py-2 px-4 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Fale conosco
        </span>
      </div>
    </motion.a>
  )
}

export default WhatsAppButton