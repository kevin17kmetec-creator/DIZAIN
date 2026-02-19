
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Layers, Zap, PenTool, Monitor } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();

  // Mapping icons to service items manually for visual flair
  const icons = [<Layers size={32} />, <PenTool size={32} />, <Monitor size={32} />, <Zap size={32} />];
  
  // Extended descriptions for the page view (normally this would be in the translation file)
  const descriptions = [
      "Celostna digitalna strategija, ki združuje poslovne cilje z uporabniško izkušnjo.",
      "Oblikovanje vmesnikov, ki niso le lepi, ampak funkcionalno dovršeni in intuitivni.",
      "Razvoj po meri z uporabo najsodobnejših tehnologij (React, WebGL, Node.js).",
      "Digitalni marketing in SEO optimizacija za maksimalno vidnost na spletu."
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neutral-900 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24 border-b border-white/10 pb-12"
        >
            <h1 className="font-display text-5xl md:text-8xl font-bold uppercase text-white mb-6">
                {t.nav.services}
            </h1>
            <p className="text-neutral-400 text-xl max-w-2xl leading-relaxed">
                {t.services.expertise}
            </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {t.services.items.map((service, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-neutral-900 p-12 hover:bg-neutral-800 transition-colors duration-500 group min-h-[300px] flex flex-col justify-between"
                >
                    <div className="flex justify-between items-start mb-8">
                        <div className="text-neutral-500 group-hover:text-white transition-colors duration-300">
                            {icons[index] || <Layers size={32} />}
                        </div>
                        <span className="font-mono text-neutral-600 text-sm">0{index + 1}</span>
                    </div>

                    <div>
                        <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                            {service}
                        </h3>
                        <p className="text-neutral-400 leading-relaxed border-l-2 border-white/10 pl-4 group-hover:border-white transition-colors duration-300">
                            {descriptions[index] || "Detailed implementation and execution."}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-24 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Imate specifičen izziv?</h3>
            <div className="w-1 h-12 bg-white mx-auto mb-6"></div>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;
