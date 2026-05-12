import React from 'react'
import { Heart, Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark-deeper text-white relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Coluna 1 - Logo e descrição */}
          <div>
            <h3 className="font-serif text-2xl bg-gradient-to-r from-primary-500 to-neon-pink bg-clip-text text-transparent mb-4">
             Empreendedoras P.Norte
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Transformando sonhos em negócios de sucesso através do empoderamento feminino e da capacitação empreendedora.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/30 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/30 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/30 hover:text-primary-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Institucional */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Institucional</h4>
            <ul className="space-y-3">
              {['Sobre nós', 'Nossa história', 'Impacto social', 'Transparência'].map((item, index) => (
                <li key={index}>
                  <Link to="#" className="text-white/50 hover:text-primary-500 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Para Empreendedoras */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Para Empreendedoras</h4>
            <ul className="space-y-3">
              {['Como participar', 'Editais abertos', 'Rede de apoio', 'Mentoria'].map((item, index) => (
                <li key={index}>
                  <Link to="#" className="text-white/50 hover:text-primary-500 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 flex-shrink-0 mt-1" />
                <span className="text-white/50 text-sm">Ceilândia - DF</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 flex-shrink-0" />
                <span className="text-white/50 text-sm">(61) 98427-4912</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 flex-shrink-0" />
                <span className="text-white/50 text-sm">pnorteempreendedoras@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white/5 my-8" />

        {/* Copyright e Studio Nébula */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/30 text-sm">
          <p className="mb-4 md:mb-0">
            © 2026 Empreendedoras P.Norte. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-2">
            <span>Desenvolvido por</span>
            <span className="text-white/50 tracking-widest">NATHALY ALBUQUERQUE</span>
            <Heart size={14} className="text-primary-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer