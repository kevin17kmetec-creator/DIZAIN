
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-32 bg-black relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-900 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-concrete-800 rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
             >
                 <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 block mb-4">{t.services.expertise}</span>
                 <h2 className="text-4xl md:text-5xl font-display font-bold text-white">{t.services.title}</h2>
             </motion.div>
             <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="hidden md:block"
             >
                 <span className="text-neutral-600 text-sm">EST. 2024</span>
             </motion.div>
        </div>

        <div className="flex flex-col">
          {t.services.items.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative border-b border-white/10 py-12 md:py-16 transition-all duration-500 hover:bg-neutral-900/30 cursor-pointer overflow-hidden"
            >
              <div className="flex items-center justify-between px-2 md:px-8 relative z-20">
                <div className="flex items-baseline gap-8">
                    <span className="text-sm md:text-base text-neutral-500 font-mono transition-colors group-hover:text-white">0{index + 1}</span>
                    <h3 className="font-display text-4xl md:text-7xl font-bold text-neutral-400 group-hover:text-white transition-all duration-500 group-hover:translate-x-4">
                    {service}
                    </h3>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-2xl">
                    ↗
                </span>
              </div>
              
              {/* Artistic Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
