import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react'

const Lightbox = ({ foto, onClose, onNext, onPrev }) => {
  // Fechar com ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
        >
          <X size={32} />
        </button>

        {/* Navegação */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
        >
          <ChevronLeft size={48} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
        >
          <ChevronRight size={48} />
        </button>

        {/* Imagem */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-5xl max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={foto.url}
            alt={foto.titulo}
            className="w-full h-full object-contain rounded-lg"
          />

          {/* Info da foto */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
            <h3 className="text-white text-xl mb-1">{foto.titulo}</h3>
            <p className="text-white/70 mb-2">{foto.descricao}</p>
            <p className="text-white/50 text-sm">{foto.data}</p>
          </div>

          {/* Botão download */}
          <a
            href={foto.url}
            download
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-glass p-3 rounded-full hover:bg-primary-500/50 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={20} className="text-white" />
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Lightbox