import React from 'react'
import { motion } from 'framer-motion'
import { Users, MapPin, Award, Calendar } from 'lucide-react'

const Stats = () => {
  const stats = [
    { number: 120, label: 'Empreendedoras', suffix: '+', icon: Users },
    { number: 15, label: 'Cidades', suffix: '+', icon: MapPin },
    { number: 8, label: 'Parceiros', suffix: '', icon: Award },
    { number: 2023, label: 'Fundação', suffix: '', icon: Calendar }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-pink-500/10 backdrop-blur-sm border border-pink-500/20 flex items-center justify-center">
            <stat.icon className="w-8 h-8 text-pink-400" />
          </div>
          <div className="font-serif text-5xl text-white mb-2">{stat.number}{stat.suffix}</div>
          <div className="text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default Stats
