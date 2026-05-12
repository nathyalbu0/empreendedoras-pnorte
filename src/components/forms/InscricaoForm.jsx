import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Send, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag,
  CheckCircle,
  Upload,
  Loader
} from 'lucide-react'
import { sendInscricaoEmail } from '../../services/emailService'

const InscricaoForm = ({ onVoltar }) => {
  const [step, setStep] = useState(1)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    segmento: '',
    descricao: '',
    experiencia: '',
    comoConheceu: ''
  })

  const segmentos = [
    'Moda Feminina',
    'Moda Infantil',
    'Brechó',
    'Artesanato',
    'Gastronomia',
    'Doces e Salgados',
    'Acessórios',
    'Bolsas',
    'Cosméticos',
    'Produtos Naturais',
    'Brinquedos',
    'Serviços Criativos'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setErro('')

    console.log('📤 Enviando inscrição:', formData)

    const result = await sendInscricaoEmail(formData)

    if (result.success) {
      console.log('✅ Inscrição enviada com sucesso!')
      setEnviado(true)
    } else {
      console.error('❌ Erro no envio:', result.message)
      setErro(result.message)
    }

    setEnviando(false)
  }

  if (enviado) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-glass rounded-3xl p-12 text-center border border-white/10"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h2 className="font-serif text-3xl text-white mb-4">Inscrição enviada!</h2>
            <p className="text-white/60 mb-8">
              Agradecemos seu interesse! Em breve nossa equipe entrará em contato com mais informações.
            </p>
            <button
              onClick={onVoltar}
              className="px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              Voltar
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={onVoltar}
          className="flex items-center gap-2 text-white/60 hover:text-primary-500 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10"
        >
          <h2 className="font-serif text-3xl text-white mb-2">Formulário de Inscrição</h2>
          <p className="text-white/50 mb-8">Preencha os dados para participar do P.NORTE</p>

          {erro && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-lg mb-6">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <div className="space-y-4">
              <h3 className="text-primary-500 font-medium flex items-center gap-2">
                <User size={18} />
                Dados Pessoais
              </h3>

              <div>
                <label className="block text-white/70 text-sm mb-2">Nome completo *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">E-mail *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Telefone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                      placeholder="(61) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Cidade/Região *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                    placeholder="Ex: Ceilândia Norte"
                  />
                </div>
              </div>
            </div>

            {/* Sobre o Negócio */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-primary-500 font-medium flex items-center gap-2">
                <ShoppingBag size={18} />
                Sobre o Negócio
              </h3>

              <div>
                <label className="block text-white/70 text-sm mb-2">Segmento *</label>
                <select
                  name="segmento"
                  value={formData.segmento}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500/50 transition-colors"
                >
                  <option value="">Selecione um segmento</option>
                  {segmentos.map((seg) => (
                    <option key={seg} value={seg}>{seg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Descreva seu produto/serviço *</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                  placeholder="Conte um pouco sobre o que você faz..."
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Há quanto tempo empreende? *</label>
                <input
                  type="text"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                  placeholder="Ex: 2 anos"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Como conheceu o P.NORTE? *</label>
                <input
                  type="text"
                  name="comoConheceu"
                  value={formData.comoConheceu}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                  placeholder="Ex: Instagram, amiga, feira..."
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Fotos dos produtos (opcional)</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary-500/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-white/30 mx-auto mb-2" />
                  <p className="text-white/50 text-sm">Clique para enviar ou arraste as imagens</p>
                  <p className="text-white/30 text-xs mt-1">PNG, JPG até 5MB</p>
                </div>
              </div>
            </div>

            {/* Termos */}
            <div className="pt-4 border-t border-white/10">
              <label className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1" />
                <span className="text-white/70 text-sm">
                  Li e concordo com as regras de participação e organização coletiva do grupo.
                </span>
              </label>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onVoltar}
                className="flex-1 px-6 py-3 border border-white/10 text-white rounded-full hover:bg-white/5 transition-colors"
                disabled={enviando}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {enviando ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar inscrição</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default InscricaoForm