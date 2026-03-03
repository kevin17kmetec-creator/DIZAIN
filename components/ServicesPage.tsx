
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Layers, Zap, PenTool, Monitor, ArrowRight, Database, LayoutTemplate } from 'lucide-react';
import Pricing from './Pricing';

interface ServicesPageProps {
  onNavigate?: (target: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const icons = [<Layers className="w-full h-full" />, <PenTool className="w-full h-full" />, <Monitor className="w-full h-full" />, <Zap className="w-full h-full" />];
  
  const descriptions = [
      "Celostna digitalna strategija, ki združuje poslovne cilje z uporabniško izkušnjo.",
      "Unikatne animacije in oblikovanje vmesnikov, ki niso le lepi, ampak funkcionalno dovršeni.",
      "Tehnična dovršenost z uporabo najsodobnejših tehnologij za bliskovito hitrost in varnost.",
      "Digitalni marketing in SEO optimizacija za maksimalno vidnost na spletu."
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] pt-32 pb-24 relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-32 border-b border-[var(--border-color)] pb-12"
        >
            <h1 className="font-display text-6xl md:text-9xl font-bold uppercase text-[var(--text-main)] mb-8 tracking-tight leading-[0.85]">
                {t.nav.services}
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <p className="text-[var(--text-secondary)] text-xl md:text-2xl max-w-2xl leading-relaxed">
                    {t.services.expertise}
                </p>
                <div className="hidden md:block w-32 h-[1px] bg-[var(--border-color)] mb-4"></div>
            </div>
        </motion.div>

        {/* Services List - "Wau" Effect */}
        <div className="flex flex-col mb-32">
            {t.services.items.map((service, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative border-t border-[var(--border-color)] py-16 md:py-24 transition-all duration-500 hover:bg-[var(--text-main)]/[0.02]"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Number */}
                        <div className="lg:col-span-1">
                            <span className="font-mono text-sm md:text-base text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors duration-300">
                                (0{index + 1})
                            </span>
                        </div>

                        {/* Title */}
                        <div className="lg:col-span-6 relative">
                             <h3 className="text-4xl md:text-7xl font-display font-bold text-[var(--text-main)] uppercase tracking-tighter transition-transform duration-500 ease-out break-words">
                                {service}
                            </h3>
                        </div>

                        {/* Description & Icon */}
                        <div className="lg:col-span-5 flex flex-col justify-center h-full pl-0 lg:pl-12 border-l-0 lg:border-l border-[var(--border-color)]">
                            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed group-hover:text-[var(--text-main)] transition-colors duration-300">
                                {descriptions[index]}
                            </p>
                        </div>
                    </div>

                    {/* Background Icon (Decorative) */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none">
                        <div className="w-64 h-64 md:w-96 md:h-96 text-[var(--text-main)] transform rotate-12">
                            {icons[index]}
                        </div>
                    </div>
                </motion.div>
            ))}
            <div className="w-full h-[1px] bg-[var(--border-color)]"></div>
        </div>

        {/* CMS Section - Feature Highlight */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-40 relative rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)]"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-main)] z-0"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[var(--noise-opacity)] mix-blend-overlay z-0"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-24 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--text-main)]/10 border border-[var(--border-color)] text-[var(--text-main)] text-xs font-bold uppercase tracking-widest mb-8">
                        <Database size={14} />
                        <span>CMS Sistem</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-main)] mb-8 leading-tight">
                        Popolna Samostojnost <br/> <span className="text-[var(--text-muted)]">brez kode.</span>
                    </h3>
                    <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                        Najenostavnejša struktura za objavo novic in spreminjanje podatkov. 
                        Sistem je zasnovan tako, da ga stranka ureja sama brez tehničnega znanja. 
                        Dodajanje vsebin je hitro in intuitivno.
                    </p>
                    <div className="flex flex-col gap-4">
                        {['Enostavno urejanje besedil', 'Hitra objava novic', 'Drag & Drop vmesnik'].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-[var(--text-main)]">
                                <div className="w-6 h-6 rounded-full bg-[var(--text-main)] flex items-center justify-center">
                                    <div className="w-2 h-2 bg-[var(--bg-main)] rounded-full"></div>
                                </div>
                                <span className="text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="relative h-[400px] bg-[var(--bg-main)]/50 rounded-xl border border-[var(--border-color)] p-8 flex items-center justify-center overflow-hidden group perspective-1000">
                    {/* Abstract UI representation - Dashboard Mockup */}
                    <motion.div 
                        className="relative w-full h-full bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] overflow-hidden flex flex-col shadow-2xl transform group-hover:rotate-y-6 group-hover:rotate-x-6 transition-transform duration-700 ease-out"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* Window Header */}
                        <div className="h-10 bg-[var(--bg-tertiary)] border-b border-[var(--border-color)] flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                        </div>
                        {/* Window Body */}
                        <div className="flex-1 flex">
                            {/* Sidebar */}
                            <div className="w-1/4 bg-[var(--bg-tertiary)]/50 border-r border-[var(--border-color)] p-4 space-y-3">
                                <div className="h-2 w-1/2 bg-[var(--text-main)]/10 rounded"></div>
                                <div className="h-2 w-3/4 bg-[var(--text-main)]/10 rounded"></div>
                                <div className="h-2 w-2/3 bg-[var(--text-main)]/10 rounded"></div>
                                <div className="mt-8 h-2 w-1/2 bg-[var(--text-main)]/10 rounded"></div>
                                <div className="h-2 w-3/4 bg-[var(--text-main)]/10 rounded"></div>
                            </div>
                            {/* Content */}
                            <div className="flex-1 p-6 space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="h-6 w-1/3 bg-[var(--text-main)]/20 rounded"></div>
                                    <div className="h-8 w-24 bg-blue-600/20 rounded border border-blue-500/30"></div>
                                </div>
                                <div className="h-40 bg-[var(--bg-tertiary)] rounded border border-[var(--border-color)] border-dashed flex flex-col items-center justify-center gap-3 group-hover:bg-[var(--bg-tertiary)]/80 transition-colors">
                                    <LayoutTemplate size={32} className="text-[var(--text-muted)]" />
                                    <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">Drag & Drop Content</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-[var(--text-main)]/10 rounded"></div>
                                    <div className="h-2 w-5/6 bg-[var(--text-main)]/10 rounded"></div>
                                    <div className="h-2 w-4/6 bg-[var(--text-main)]/10 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
        
        {/* Pricing Section */}
        <Pricing onNavigate={onNavigate} />

        {/* CTA Section */}
        <div className="mt-32 text-center pb-24">
            <h3 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-main)] mb-8">Imate specifičen izziv?</h3>
            <button 
                onClick={() => onNavigate?.('contact')}
                className="px-12 py-6 bg-[var(--text-main)] text-[var(--bg-main)] font-bold uppercase tracking-widest hover:bg-[var(--text-secondary)] transition-colors rounded-full"
            >
                Kontaktirajte nas
            </button>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;
