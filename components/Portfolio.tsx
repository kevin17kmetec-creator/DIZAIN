
import React, { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  // We use a static ref for the container so the scroll calculation is stable
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start: When top of card hits bottom of screen
    // End: When center of card hits center of screen
    offset: ["start end", "center center"] 
  });

  const isEven = index % 2 === 0;
  
  // ANIMATION LOGIC:
  // If isEven (Layout: Image Left, Text Right): Image comes FROM Right (150px) to 0.
  // If !isEven (Layout: Image Right, Text Left): Image comes FROM Left (-150px) to 0.
  const x = useTransform(scrollYProgress, [0, 1], [isEven ? 150 : -150, 0]);
  
  // Opacity: Starts at 0.2 (slightly visible) and hits 1.0 quickly (at 60% of scroll)
  // so it doesn't look gray/disabled when nearly centered.
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1]);
  
  // Subtle scale up for depth
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center w-full`}
    >
        {/* Animated Image Container */}
        <motion.div 
            style={{ x, opacity, scale }}
            className="w-full md:w-2/3 relative will-change-transform"
        >
          <div className="overflow-hidden relative h-[50vh] md:h-[70vh] border border-white/5 bg-neutral-900 shadow-2xl">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-90 transition-all duration-700 hover:scale-105 hover:opacity-100"
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
        </motion.div>

        {/* Text Info - Static or separate subtle animation */}
        <div className={`w-full md:w-1/3 flex flex-col ${!isEven && 'items-end text-right'}`}>
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">{project.category}</span>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 hover:text-neutral-200 transition-colors cursor-default">{project.title}</h3>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-sm">
              {project.description}
          </p>
          
          <div className={`group flex items-center gap-4 cursor-pointer ${!isEven && 'flex-row-reverse'}`}>
              <div className="w-12 h-[1px] bg-white/30 group-hover:w-24 transition-all duration-300"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-white">View Project</span>
          </div>
        </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="relative bg-concrete-900 py-24 overflow-hidden">
      {/* Background decoration to show depth */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-32 relative z-10 text-center md:text-left">
             <h2 className="font-display text-4xl md:text-8xl font-bold uppercase text-white leading-none">
                {t.portfolio.featured} <br/> <span className="text-neutral-700 stroke-white">{t.portfolio.works}</span>
             </h2>
        </div>

        {/* Vertical List */}
        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
