
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const { t } = useLanguage();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-concrete-900">
      
      {/* 
        THE MONOLITH BACKGROUND (Central Logo Area)
      */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale, opacity }}
      >
         {/* Base concrete texture */}
         <div className="absolute inset-0 bg-concrete-900"></div>
         
         {/* The Logo Image Blended */}
         <div 
            className="absolute inset-0 bg-no-repeat opacity-80"
            style={{ 
                backgroundImage: `url('https://drive.google.com/thumbnail?id=1DlZuPg-7SZUxT8Etv1BqRjk_8C-t1xCQ&sz=w1920')`,
                backgroundSize: 'cover',
                // Using existing position
                backgroundPosition: 'center 60%',
                // Mask edges
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
            }}
         ></div>

         {/* Stronger Dark Overlay for Text Readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-concrete-900/40 via-transparent to-concrete-900/90"></div>
         
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </motion.div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 z-10 flex flex-col items-center relative h-full"
      >
        
        {/* Main Content - Pushed to absolute bottom 12 (approx 3rem/48px) with no extra padding */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-end z-30 pb-0">
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white text-lg md:text-3xl font-display font-bold tracking-[0.3em] uppercase text-center drop-shadow-2xl max-w-4xl px-4 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12"
          >
            <a 
              href="#portfolio"
              onClick={(e) => handleScrollTo(e, 'portfolio')}
              className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden font-display text-sm tracking-widest text-white transition-all duration-300 ease-out border border-white/40 bg-black/60 backdrop-blur-md hover:border-white hover:bg-white"
            >
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">{t.hero.cta}</span>
              <span className="relative invisible">{t.hero.cta}</span>
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease font-bold">
                {t.hero.cta}
              </span>
            </a>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default Hero;
