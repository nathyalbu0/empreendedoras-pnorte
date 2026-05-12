import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Calendar } from 'lucide-react'
import Lightbox from './Lightbox'

const GaleriaGrid = ({ fotos }) => {
  const [selectedFoto, setSelectedFoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedFoto(fotos[index])
  }

  const closeLightbox = () => {
    setSelectedFoto(null)
  }

  const nextFoto = () => {
    const newIndex = (currentIndex + 1) % fotos.length
    setCurrentIndex(newIndex)
    setSelectedFoto(fotos[newIndex])
  }

  const prevFoto = () => {
    const newIndex = (currentIndex - 1 + fotos.length) % fotos.length
    setCurrentIndex(newIndex)
    setSelectedFoto(fotos[newIndex])
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {fotos.map((foto, index) => (
          <motion.div
            key={foto.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
            onClick={() => openLightbox(index)}
          >
            {/* Imagem */}
            <div className="aspect-square overflow-hidden">
              <img
                src={foto.url}
                alt={foto.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Overlay com informações */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-medium mb-1">{foto.titulo}</h3>
                <p className="text-white/70 text-sm line-clamp-2">{foto.descricao}</p>
                <div className="flex items-center gap-2 mt-2 text-white/50 text-xs">
                  <Calendar size={12} />
                  <span>{foto.data}</span>
                </div>
              </div>
            </div>

            {/* Badge de categoria */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-primary-500/90 backdrop-blur-sm rounded-full text-white text-xs">
              {foto.categoria === 'feira' ? '📸 Feira' : 
               foto.categoria === 'capacitacao' ? '🎓 Capacitação' : '🎉 Evento'}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedFoto && (
        <Lightbox
          foto={selectedFoto}
          onClose={closeLightbox}
          onNext={nextFoto}
          onPrev={prevFoto}
        />
      )}
    </>
  )
}

export default GaleriaGrid