import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image, Loader } from 'lucide-react'

const UploadImagem = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setUploading(true)
      
      // Criar preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setUploading(false)
      }
      reader.readAsDataURL(file)

      // Simular upload (aqui você faria o envio real para um servidor)
      setTimeout(() => {
        if (onUpload) {
          onUpload({
            file,
            preview: reader.result,
            nome: file.name,
            tamanho: file.size
          })
        }
      }, 2000)
    }
  }

  const removePreview = () => {
    setPreview(null)
  }

  return (
    <div className="bg-white/5 backdrop-blur-glass rounded-2xl p-6 border border-white/10">
      <h3 className="font-serif text-xl text-white mb-4">Adicionar fotos</h3>

      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary-500 bg-primary-500/10' 
              : 'border-white/10 hover:border-primary-500/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <Upload className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <p className="text-white/70 mb-2">
            Arraste uma imagem ou clique para selecionar
          </p>
          <p className="text-white/30 text-sm">
            PNG, JPG até 10MB
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-xl overflow-hidden"
        >
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end justify-between">
            <div>
              <p className="text-white font-medium">Pronto para enviar!</p>
              <p className="text-white/60 text-sm">Clique em salvar para adicionar à galeria</p>
            </div>
            
            <button
              onClick={removePreview}
              className="p-2 bg-white/10 backdrop-blur-glass rounded-full hover:bg-red-500/50 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader size={32} className="text-primary-500 animate-spin" />
            </div>
          )}
        </motion.div>
      )}

      <div className="mt-4 flex gap-2">
        <button className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          Salvar na galeria
        </button>
        <button className="px-4 py-2 border border-white/10 text-white/70 rounded-lg hover:bg-white/5 transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default UploadImagem