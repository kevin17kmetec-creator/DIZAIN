
import React from 'react';
import { motion } from 'framer-motion';
import { Target, PenTool, CheckCircle, Code, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Prvi stik & Vizija',
    description: 'Stranka nam zaupa svoje želje, preference glede barv in funkcionalnosti, ki jih potrebuje na strani.',
    color: '#4ade80', // Green
    icon: Target
  },
  {
    id: '02',
    title: 'Brezplačen osnutek (7 dni)',
    description: 'V manj kot 7 dneh pripravimo neobvezujoč prvi vpogled v strukturo in dizajn. Stranka dobi vizualno potrditev brez tveganja.',
    color: '#06b6d4', // Cyan
    icon: PenTool
  },
  {
    id: '03',
    title: 'Odločitev za sodelovanje',
    description: 'Na podlagi osnutka se stranka odloči za sodelovanje. Brez pritiska – naše delo govori zase.',
    color: '#a855f7', // Purple
    icon: CheckCircle
  },
  {
    id: '04',
    title: 'Gradnja do popolnosti',
    description: 'Ko je sodelovanje potrjeno, začnemo na osnovi osnutka graditi končno, tehnično dovršeno podobo strani.',
    color: '#ec4899', // Pink
    icon: Code
  },
  {
    id: '05',
    title: 'Samostojno upravljanje (CMS)',
    description: 'Implementiramo enostaven sistem, kjer stranka sama ureja novice, galerije, urnike in druge podatke brez programerskega znanja.',
    color: '#f97316', // Orange
    icon: Settings
  },
  {
    id: '06',
    title: 'Objava & Gostovanje',
    description: 'Poskrbimo za varno gostovanje in optimiziran prehod v živo. Stran je hitra, varna in SEO optimizirana.',
    color: '#eab308', // Yellow
    icon: Rocket
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#050505] relative overflow-hidden text-white transition-colors duration-500">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-24 border-b border-white/10 pb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-widest text-white"
          >
            Naš Proces
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const Icon = step.icon;
            
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative z-10 mb-16 md:mb-24"
              >
                {/* Zig-Zag Line to next step (Desktop only) */}
                {index < steps.length - 1 && (
                  <div 
                    className="hidden md:block absolute z-0 pointer-events-none"
                    style={{
                      top: '50%',
                      height: 'calc(100% + 6rem)', // 6rem matches md:mb-24
                      left: '22.5%',
                      right: '22.5%',
                    }}
                  >
                    <svg width="100%" height="100%" preserveAspectRatio="none">
                      {isEven ? (
                        <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                      ) : (
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                      )}
                    </svg>
                  </div>
                )}

                <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                  {/* Circle Node */}
                  <div className={`w-full md:w-[45%] flex justify-center relative z-20 mb-8 md:mb-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <div 
                      className="w-20 h-20 md:w-28 md:h-28 rounded-full border-[3px] flex flex-col items-center justify-center bg-[#050505] transition-all duration-500 hover:scale-110 relative group cursor-default"
                      style={{ 
                        borderColor: step.color,
                        boxShadow: `0 0 30px ${step.color}40`
                      }}
                    >
                      {/* Inner glow */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                        style={{ backgroundColor: step.color }}
                      />
                      <span className="text-[10px] md:text-sm font-mono font-bold text-white/50 mb-1">{step.id}</span>
                      <Icon size={28} color={step.color} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-[45%] group ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="p-6 md:p-10 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-2xl transition-all duration-500 hover:bg-[#111] hover:border-white/10 relative overflow-hidden text-center md:text-left">
                      {/* Glow effect on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at ${isEven ? 'right' : 'left'} center, ${step.color}, transparent 70%)` }}
                      />
                      
                      <h3 
                        className="text-2xl md:text-3xl font-display font-bold mb-4 transition-colors duration-300"
                        style={{ color: step.color }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
