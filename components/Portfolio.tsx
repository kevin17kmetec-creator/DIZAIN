
import React, { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  specs: string[];
  date: string; // Added for sorting (YYYY-MM-DD)
  link?: string;
  imageClass?: string;
}

export const projects: Project[] = [
  {
    id: 0,
    title: "ZK Photo Lab",
    category: "Photography & Design",
    image: "https://drive.google.com/thumbnail?id=1E4UqHuK74vn71mwMgxuDh3TWY4lCvCil&sz=w1920", 
    description: "Immersive visual storytelling platform for ZK Photo Lab.",
    specs: ["React", "Gallery", "UX/UI"],
    date: "2024-02-15",
    link: "https://www.zkphotolab.si/",
    imageClass: "object-contain p-4 bg-black"
  }
  // Add more real projects here in the future
];

interface PortfolioProps {
    onPreview?: (url: string) => void;
}

const ProjectCard: React.FC<{ project: Project; index: number; onPreview?: (url: string) => void }> = ({ project, index, onPreview }) => {
  // We use a static ref for the container so the scroll calculation is stable
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start: When top of card hits bottom of screen
    // End: When center of card hits center of screen
    offset: ["start end", "center center"] 
  });

  const isEven = index % 2 === 0;
  
  // ANIMATION LOGIC (Restored from previous working version):
  // If isEven (Layout: Image Left, Text Right): Image comes FROM Right (150px) to 0.
  // If !isEven (Layout: Image Right, Text Left): Image comes FROM Left (-150px) to 0.
  const x = useTransform(scrollYProgress, [0, 1], [isEven ? 150 : -150, 0]);
  
  // Opacity: Starts at 0.2 and hits 1.0 quickly so it doesn't look gray when centered
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1]);
  
  // Subtle scale up for depth
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const handleProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (project.link) {
        if (onPreview) {
            onPreview(project.link);
        } else {
            window.open(project.link, '_blank');
        }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center w-full`}
    >
        {/* Image & Number Container */}
        <div className="w-full md:w-2/3 relative">
            {/* Animated Image Container */}
            <motion.div 
                style={{ x, opacity, scale }}
                className={`relative will-change-transform ${project.link ? 'cursor-pointer group' : ''}`}
                onClick={project.link ? handleProjectClick : undefined}
            >
              <div className="overflow-hidden relative h-[50vh] md:h-[70vh] border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - ${project.category} project preview`} 
                    className={`w-full h-full ${project.imageClass || 'object-cover'} opacity-90 transition-all duration-700 hover:scale-105 hover:opacity-100`}
                  />
              </div>
              
              {/* Tech Specs */}
              <div className={`flex gap-2 mt-4 ${!isEven && 'justify-end'}`}>
                  {project.specs.map((spec, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest border border-[var(--border-color)] px-2 py-1 text-[var(--text-secondary)]">
                          {spec}
                      </span>
                  ))}
              </div>
            </motion.div>

            {/* Overlay Number - Moved outside the image motion.div to fix mix-blend-difference with background */}
            <motion.div 
                style={{ x, opacity, scale }}
                className={`absolute -top-10 md:-top-16 z-20 mix-blend-difference pointer-events-none will-change-transform ${isEven ? '-left-4 md:-left-12' : '-right-4 md:-right-12'}`}
            >
                <span className="font-display font-bold text-8xl md:text-[10rem] text-white">0{index + 1}</span>
            </motion.div>
        </div>

        {/* Text Info */}
        <div className={`w-full md:w-1/3 flex flex-col ${!isEven && 'items-end text-right'}`}>
          <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">{project.category}</span>
          <h3 
            onClick={project.link ? handleProjectClick : undefined}
            className={`text-4xl md:text-6xl font-display font-bold text-[var(--text-main)] mb-6 transition-colors ${project.link ? 'cursor-pointer hover:text-[var(--text-secondary)]' : ''}`}
          >
            {project.title}
          </h3>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 max-w-sm">
              {project.description}
          </p>
          
          <div 
             onClick={project.link ? handleProjectClick : undefined}
             className={`group flex items-center gap-4 ${!isEven && 'flex-row-reverse'} ${project.link ? 'cursor-pointer' : ''}`}
          >
              <div className="w-12 h-[1px] bg-[var(--text-main)]/30 group-hover:w-24 transition-all duration-300"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-main)]">
                {project.link ? "Live Preview" : "View Project"}
              </span>
          </div>
        </div>
    </div>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ onPreview }) => {
  const { t } = useLanguage();

  // Sort projects by date (newest first) and limit to 5 for home page
  const displayedProjects = [...projects]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section id="portfolio" className="relative bg-[var(--bg-main)] py-24 overflow-hidden transition-colors duration-500">
      {/* Background decoration to show depth */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--text-main)]/[0.02] to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-32 relative z-10 text-center md:text-left">
             <h2 className="font-display text-4xl md:text-8xl font-bold uppercase text-[var(--text-main)] leading-none">
                {t.portfolio.featured} <br/> <span className="text-[var(--text-muted)]">{t.portfolio.works}</span>
             </h2>
        </div>

        {/* Vertical List */}
        <div className="flex flex-col gap-32 md:gap-48">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onPreview={onPreview} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
