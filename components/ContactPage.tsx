
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden flex flex-col">
       {/* Background Ambience */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
       <div className="absolute left-0 top-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Context & Info */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-8 leading-[0.9]">
                    {t.nav.contact}
                </h1>
                
                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-md mb-12 border-l border-white/10 pl-6">
                    {t.contact.subtitle}
                </p>
                
                <div className="mb-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Lokacija</h3>
                    <p className="text-neutral-400">Tehnološki Park 19<br/>1000 Ljubljana<br/>Slovenija</p>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Kontakt</h3>
                    <p className="text-neutral-400">hello@dizain.agency<br/>+386 1 234 5678</p>
                </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-neutral-900 border border-white/10 p-8 md:p-12 shadow-2xl relative"
            >
                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3 group">
                            <label className="text-xs font-bold uppercase tracking-widest text-white mb-2 block">
                                {t.contact.placeholders.name}
                            </label>
                            <input 
                                type="text" 
                                className="w-full bg-black border border-neutral-800 p-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all duration-300 placeholder-neutral-700"
                            />
                        </div>
                        <div className="space-y-3 group">
                            <label className="text-xs font-bold uppercase tracking-widest text-white mb-2 block">
                                {t.contact.placeholders.email}
                            </label>
                            <input 
                                type="email" 
                                className="w-full bg-black border border-neutral-800 p-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all duration-300 placeholder-neutral-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 group">
                        <label className="text-xs font-bold uppercase tracking-widest text-white mb-2 block">
                            {t.contact.placeholders.project}
                        </label>
                        <input 
                            type="text" 
                            className="w-full bg-black border border-neutral-800 p-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all duration-300 placeholder-neutral-700"
                        />
                    </div>

                    <div className="space-y-3 group">
                        <label className="text-xs font-bold uppercase tracking-widest text-white mb-2 block">
                            {t.contact.placeholders.details}
                        </label>
                        <textarea 
                            rows={4}
                            className="w-full bg-black border border-neutral-800 p-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all duration-300 resize-none placeholder-neutral-700"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-6 bg-white text-black font-display font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-3 group mt-4"
                    >
                        {t.contact.send}
                        <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                </form>
            </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
