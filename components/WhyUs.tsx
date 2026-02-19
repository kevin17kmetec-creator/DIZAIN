
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhyUs: React.FC = () => {
  const { t } = useLanguage();
  
  const icons = [<Target className="w-8 h-8" />, <Zap className="w-8 h-8" />, <Layers className="w-8 h-8" />];

  return (
    <section className="py-32 bg-concrete-800 text-white relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Header */}
          <div className="lg:col-span-4 sticky top-32 self-start">
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-tight mb-8">
              The <br/> DIZAIN <br/> {t.whyUs.standard}
            </h2>
            <div className="w-20 h-1 bg-white mb-8" />
            <p className="text-neutral-400 text-lg leading-relaxed">
              {t.whyUs.desc}
            </p>
          </div>

          {/* Grid Content */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {t.whyUs.items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`bg-concrete-800 p-12 hover:bg-neutral-800 transition-colors duration-500 flex flex-col justify-between aspect-square ${index === 2 ? 'md:col-span-2 md:aspect-[2/1]' : ''}`}
              >
                <div className="text-white/50 mb-8">{icons[index]}</div>
                <div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-neutral-400 leading-relaxed max-w-sm">{item.desc}</p>
                </div>
                <div className="text-right mt-8">
                    <span className="text-6xl font-display text-white/5 font-bold">0{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;
