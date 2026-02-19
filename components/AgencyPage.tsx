
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import TechSpecs from './TechSpecs'; // Reusing the tech chart as it fits well here

const AgencyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-concrete-900 pt-32 pb-0 relative overflow-hidden">
        
      <div className="container mx-auto px-6 relative z-10 mb-24">
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
        >
            <h1 className="font-display text-5xl md:text-8xl font-bold uppercase text-white mb-8 leading-[0.9]">
                {t.nav.agency}
            </h1>
            <div className="w-full h-[1px] bg-gradient-to-r from-white/50 to-transparent mb-12"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">{t.whyUs.title}</h2>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        {t.whyUs.desc}
                    </p>
                </div>
                <div className="border-l border-white/10 pl-8 flex flex-col justify-center">
                     <p className="text-2xl text-white italic font-serif opacity-80">
                        "Arhitektura ni le o zgradbah. Je o strukturi informacij, občutku prostora in toku interakcije v digitalnem svetu."
                     </p>
                </div>
            </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            {t.whyUs.items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-t border-white/20 pt-6"
                >
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 block">0{index+1}</span>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Tech Specs Section embedded */}
      <div className="bg-black">
          <TechSpecs />
      </div>

    </div>
  );
};

export default AgencyPage;
