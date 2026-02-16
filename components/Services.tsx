
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const services = [
  "Strategy", "Design", "Development", "Marketing"
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="services" ref={containerRef} className="py-32 bg-black relative overflow-hidden">
        {/* Background Parallax Elements */}
        <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-900 rounded-full blur-[100px] opacity-20 pointer-events-none" 
        />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 mb-20"
        >
             <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
             <span className="uppercase tracking-[0.2em] text-sm text-neutral-400">Our Expertise</span>
        </motion.div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative border-t border-white/10 py-16 transition-colors duration-500 hover:bg-white/5 cursor-pointer"
            >
              <div className="flex items-baseline justify-between px-4 md:px-12 relative z-10">
                <h3 className="font-display text-5xl md:text-8xl font-bold text-transparent text-outline group-hover:text-white transition-all duration-500">
                  {service}
                </h3>
                <span className="hidden md:block text-neutral-500 group-hover:text-white transition-colors duration-500 text-sm tracking-widest uppercase">
                    (0{index + 1})
                </span>
              </div>
              
              {/* Hover Reveal Image/Gradient - Abstract representation of 'morphing' */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ skewX: -20 }}
              />
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
};

export default Services;
    