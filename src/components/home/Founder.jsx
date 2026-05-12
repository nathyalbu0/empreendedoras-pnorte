import React from 'react'
import { motion } from 'framer-motion'

const Founder = () => {
  return (
    <section className="py-32 bg-[#0F0F14]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
          >
            <p className="font-serif text-3xl text-white italic mb-8">
              "Juntas somos mais fortes. Cada mulher que empoderamos é uma comunidade que transformamos."
            </p>
            <div>
              <p className="font-serif text-xl text-white">Brisa Santana</p>
              <p className="text-gray-400">Fundadora do EMPREENDEDORAS P.NORTE</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Founder
