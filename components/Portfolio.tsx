
import React, { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  specs: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Nourish",
    category: "3D E-Commerce",
    image: "https://picsum.photos/800/600?random=1",
    description: "WebGL powered skincare experience.",
    specs: ["Three.js", "React", "GSAP"]
  },
  {
    id: 2,
    title: "Vortex",
    category: "FinTech",
    image: "https://picsum.photos/800/600?random=2",
    description: "Next-gen banking interface.",
    specs: ["Security", "Real-time", "App"]
  },
  {
    id: 3,
    title: "Aeon",
    category: "Architecture",
    image: "https://picsum.photos/800/600?random=3",
    description: "Minimalist portfolio platform.",
    specs: ["Minimal", "Gallery", "CMS"]
  },
  {
    id: 4,
    title: "Zenith",
    category: "Automotive",
    image: "https://picsum.photos/800/600?random=4",
    description: "Electric vehicle configurator.",
    specs: ["3D", "Configurator", "Vue"]
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // "start end" = when top of element enters bottom of viewport
  // "end start" = when bottom of element leaves top of viewport
  // This ensures the animation plays continuously while the element is visible
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] 
  });

  const isEven = index % 2 === 0;
  
  // Continuous movement from entry to exit
  // IsEven: Moves from -100px to 100px (Left to Right relative direction)
  // !IsEven: Moves from 100px to -100px (Right to Left relative direction)
  const x = useTransform(scrollYProgress, [0, 1], [isEven ? -100 : 100, isEven ? 100 : -100]);
  
  // Opacity fade in remains fast to ensure visibility
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div 
      ref={ref}
      style={{ x, opacity }}
      className={`group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center w-full will-change-transform`}
    >
        {/* Image Container */}
        <div className="w-full md:w-2/3 relative">
          <div className="overflow-hidden relative h-[50vh] md:h-[70vh] border border-white/5">
              <div className="absolute inset-0 bg-neutral-900 z-0"></div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              
                {/* Overlay Number */}
                <div className={`absolute -top-10 md:-top-16 z-20 mix-blend-difference pointer-events-none ${isEven ? '-left-4 md:-left-12' : '-right-4 md:-right-12'}`}>
                      <span className="font-display font-bold text-8xl md:text-[10rem] text-white">0{index + 1}</span>
                </div>
          </div>
          
          {/* Tech Specs */}
          <div className={`flex gap-2 mt-4 ${!isEven && 'justify-end'}`}>
              {project.specs.map((spec, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-widest border border-white/20 px-2 py-1 text-white/60">
                      {spec}
                  </span>
              ))}
          </div>
        </div>

        {/* Text Info */}
        <div className={`w-full md:w-1/3 flex flex-col ${!isEven && 'items-end text-right'}`}>
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">{project.category}</span>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 group-hover:text-neutral-200 transition-colors">{project.title}</h3>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-sm">
              {project.description}
          </p>
          
          <div className={`flex items-center gap-4 ${!isEven && 'flex-row-reverse'}`}>
              <div className="w-12 h-[1px] bg-white/30 group-hover:w-24 transition-all duration-300"></div>
              <span className="text-xs font-bold uppercase tracking-widest">View Project</span>
          </div>
        </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="relative bg-concrete-900 py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-24 relative z-10">
             <h2 className="font-display text-4xl md:text-8xl font-bold uppercase text-white leading-none">
                {t.portfolio.featured} <br/> <span className="text-neutral-600 stroke-white">{t.portfolio.works}</span>
             </h2>
        </div>

        {/* Vertical List using specific Scroll Components */}
        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
