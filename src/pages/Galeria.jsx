import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Filter, Grid, LayoutGrid, Camera } from 'lucide-react'
import GaleriaGrid from '../components/galeria/GaleriaGrid'
import UploadImagem from '../components/galeria/UploadImagem'
import { fotos } from '../data/fotosData'

const Galeria = () => {
  const [categoria, setCategoria] = useState('todas')
  const [layout, setLayout] = useState('grid')
  const [showUpload, setShowUpload] = useState(false)

  const categorias = [
    { id: 'todas', nome: 'Todas' },
    { id: 'feira', nome: 'Feiras' },
    { id: 'capacitacao', nome: 'Capacitações' },
    { id: 'evento', nome: 'Eventos' }
  ]

  const fotosFiltradas = categoria === 'todas' 
    ? fotos 
    : fotos.filter(foto => foto.categoria === categoria)

  return (
    <div className="bg-dark-base text-white pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm mb-6"
          >
            <Camera size={16} />
            <span>Memórias do P.NORTE</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            Galeria de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-neon-pink">Fotos</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/60 max-w-3xl mx-auto mb-8"
          >
            Momentos especiais das nossas feiras, capacitações e encontros
          </motion.p>
        </div>
      </section>

      {/* Filtros e controles */}
      <section className="py-8 border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Filtros por categoria */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-white/40" />
              <div className="flex gap-2">
                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoria(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      categoria === cat.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {cat.nome}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout toggle e upload */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    layout === 'grid' ? 'bg-primary-500 text-white' : 'text-white/60'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setLayout('masonry')}
                  className={`p-2 rounded-lg transition-colors ${
                    layout === 'masonry' ? 'bg-primary-500 text-white' : 'text-white/60'
                  }`}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>

              <button
                onClick={() => setShowUpload(!showUpload)}
                className="px-4 py-2 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg transition-all"
              >
                Adicionar fotos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upload (se ativo) */}
      {showUpload && (
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6">
            <UploadImagem onUpload={(foto) => console.log('Foto enviada:', foto)} />
          </div>
        </section>
      )}

      {/* Galeria */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          {fotosFiltradas.length > 0 ? (
            <GaleriaGrid fotos={fotosFiltradas} />
          ) : (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-lg">Nenhuma foto encontrada nesta categoria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Galeria