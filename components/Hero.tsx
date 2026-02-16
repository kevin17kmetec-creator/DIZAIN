
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const title = "DIZAIN";
  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 1.2,
        type: "spring",
        bounce: 0.25
      }
    })
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-concrete-900">
      {/* Dynamic Background Texture (Concrete) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div>
        {/* Spotlight Effect */}
        <motion.div 
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_transparent_50%)] pointer-events-none"
          animate={{ 
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "10%", "-10%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 z-10 flex flex-col items-center relative"
      >
        {/* Architectural Grid Lines (Vertical) */}
        <div className="absolute top-0 bottom-0 left-6 md:left-24 w-px bg-white/5 h-[200vh] -translate-y-1/2" />
        <div className="absolute top-0 bottom-0 right-6 md:right-24 w-px bg-white/5 h-[200vh] -translate-y-1/2" />

        <div className="relative perspective-1000">
           {/* Split Character Animation */}
          <h1 className="font-display text-[18vw] md:text-[14vw] leading-[0.8] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-tighter flex select-none mix-blend-difference">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block hover:text-white transition-colors duration-500 hover:scale-105 transform origin-bottom"
                style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>
        
        <div className="overflow-hidden mt-12 md:mt-16 relative">
          <motion.div
             initial={{ width: 0 }}
             animate={{ width: "100%" }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="h-px bg-white/20 absolute top-0 left-0"
          />
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-neutral-400 text-sm md:text-xl font-sans font-light tracking-[0.3em] uppercase max-w-xl text-center pt-8"
          >
            Innovation Meets Architecture
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-[-15vh] md:bottom-[-20vh]"
        >
          <a 
            href="#portfolio"
            className="group flex flex-col items-center gap-4 text-white/50 hover:text-white transition-colors duration-300"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Explore</span>
            <div className="w-px h-24 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
               <motion.div 
                 className="absolute top-0 left-0 w-full h-1/2 bg-white"
                 animate={{ top: ["-100%", "100%"] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
    