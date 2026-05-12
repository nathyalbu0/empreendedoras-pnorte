import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (error) {
      setError('E-mail ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-base text-white flex items-center justify-center py-20">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm mb-4">
                <Sparkles size={14} />
                <span>Área da Empreendedora</span>
              </div>
              <h1 className="font-serif text-3xl text-white mb-2">Bem-vinda de volta</h1>
              <p className="text-white/50">Acesse sua conta para continuar</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-white/70 text-sm mb-2">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white/50"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-white/10 bg-white/5 text-primary-500" />
                  <span className="text-white/50 text-sm">Lembrar-me</span>
                </label>
                <a href="#" className="text-primary-500 text-sm hover:text-neon-pink transition-colors">
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-white/50 text-sm mb-2">
                Ainda não tem conta?{' '}
                <Link to="/cadastro" className="text-primary-500 hover:text-neon-pink transition-colors">
                  Cadastre-se
                </Link>
              </p>
              <p className="text-white/30 text-xs">
                Use: empreendedora@pnorte.org / 123456
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login