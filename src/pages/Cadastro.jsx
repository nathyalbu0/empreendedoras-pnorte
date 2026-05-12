import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Cadastro = () => {
  const navigate = useNavigate();
  const { register, error, loading } = useAuth();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefone: '',
    cidade: '',
    segmento: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const segmentos = [
    'Moda Feminina', 'Moda Infantil', 'Brechó', 'Artesanato',
    'Gastronomia', 'Doces e Salgados', 'Acessórios', 'Bolsas',
    'Cosméticos', 'Produtos Naturais', 'Brinquedos', 'Serviços Criativos'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpar erro do campo quando usuário digita
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nome) errors.nome = 'Nome é obrigatório';
    if (!formData.email) errors.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'E-mail inválido';
    }

    if (!formData.password) errors.password = 'Senha é obrigatória';
    else if (formData.password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'As senhas não conferem';
    }

    if (!formData.telefone) errors.telefone = 'Telefone é obrigatório';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-dark-base text-white py-20">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-glass rounded-3xl p-8 border border-white/10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm mb-4">
                <Sparkles size={14} />
                <span>Junte-se a nós</span>
              </div>
              <h1 className="font-serif text-3xl text-white mb-2">Criar conta</h1>
              <p className="text-white/50">Preencha seus dados para começar</p>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Nome completo *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${formErrors.nome ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors`}
                    placeholder="Seu nome completo"
                  />
                </div>
                {formErrors.nome && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">E-mail *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${formErrors.email ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors`}
                    placeholder="seu@email.com"
                  />
                </div>
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
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
                    className={`w-full bg-white/5 border ${formErrors.telefone ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors`}
                    placeholder="(61) 99999-9999"
                  />
                </div>
                {formErrors.telefone && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.telefone}</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Cidade/Região</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                    placeholder="Ex: Ceilândia Norte"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Segmento</label>
                <div className="relative">
                  <ShoppingBag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <select
                    name="segmento"
                    value={formData.segmento}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-500/50 transition-colors appearance-none"
                  >
                    <option value="">Selecione um segmento</option>
                    {segmentos.map((seg) => (
                      <option key={seg} value={seg}>{seg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Senha *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${formErrors.password ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors`}
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
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Confirmar senha *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors`}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white/50"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-neon-pink text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Criando conta...</span>
                  </>
                ) : (
                  <>
                    <span>Criar conta</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-white/50 text-sm">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary-500 hover:text-neon-pink transition-colors">
                  Fazer login
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;