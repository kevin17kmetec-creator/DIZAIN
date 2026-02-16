
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 bg-concrete-900 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">{t.contact.title}</h2>
          <p className="text-neutral-400 text-xl">{t.contact.subtitle}</p>
        </motion.div>

        <form className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group">
              <input 
                type="text" 
                placeholder={t.contact.placeholders.name}
                className="w-full bg-transparent border-b border-neutral-700 py-4 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-neutral-600"
              />
            </div>
            <div className="relative group">
              <input 
                type="email" 
                placeholder={t.contact.placeholders.email} 
                className="w-full bg-transparent border-b border-neutral-700 py-4 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-neutral-600"
              />
            </div>
          </div>
          
          <div className="relative group">
            <input 
              type="text" 
              placeholder={t.contact.placeholders.project} 
              className="w-full bg-transparent border-b border-neutral-700 py-4 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-neutral-600"
            />
          </div>

          <div className="relative group">
            <textarea 
              rows={4}
              placeholder={t.contact.placeholders.details} 
              className="w-full bg-transparent border-b border-neutral-700 py-4 text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-neutral-600 resize-none"
            />
          </div>

          <div className="text-center pt-8">
            <button 
              type="submit" 
              className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-300"
            >
              {t.contact.send}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default Contact;
