import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props 
}) => {
  
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-base'
  
  const variants = {
    primary: 'bg-gradient-pink-deep text-white hover:shadow-glow-pink',
    glass: 'bg-white/5 backdrop-blur-glass border border-white/10 text-white hover:bg-white/10 hover:border-primary-500/50 hover:shadow-glow-pink',
    'glass-outline': 'bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-primary-500 hover:shadow-glow-pink',
    ghost: 'text-white/70 hover:text-white hover:bg-white/5',
  }
  
  const sizes = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-7 py-3.5 text-base gap-3',
    lg: 'px-9 py-4 text-lg gap-3',
  }
  
  const buttonClasses = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `
  
  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'lg' ? 24 : 20} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'lg' ? 24 : 20} />}
    </motion.button>
  )
}

export default Button