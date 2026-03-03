
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from './Portfolio';
import { ArrowUpRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface WorksPageProps {
    onPreview: (url: string) => void;
}

const PROJECTS_PER_PAGE = 5;

const WorksPage: React.FC<WorksPageProps> = ({ onPreview }) => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  // Sort projects by date (newest first)
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalPages = Math.ceil(sortedProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const currentProjects = sortedProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const handleProjectClick = (link?: string) => {
      if (link) {
          onPreview(link);
      }
  };

  const handlePageChange = (page: number) => {
      setCurrentPage(page);
      // Scroll to top of the works section
      if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] pt-32 pb-24 relative overflow-hidden transition-colors duration-500">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--bg-secondary)] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10" ref={topRef}>
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24"
        >
            <h1 className="font-display text-5xl md:text-8xl font-bold uppercase text-[var(--text-main)] mb-6">
                {t.portfolio.works}
            </h1>
            <div className="w-24 h-1 bg-[var(--text-main)] mb-8" />
            <p className="text-[var(--text-secondary)] text-xl max-w-2xl leading-relaxed">
                {t.whyUs.desc}
            </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <AnimatePresence mode="wait">
                {currentProjects.map((project, index) => (
                    <motion.div
                        key={`${project.id}-${currentPage}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group cursor-pointer"
                        onClick={() => handleProjectClick(project.link)}
                    >
                        <div className="relative overflow-hidden aspect-[4/3] mb-6 border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                            <div className="absolute inset-0 bg-[var(--bg-tertiary)] animate-pulse" />
                            <img 
                                src={project.image} 
                                alt={`${project.title} - ${project.category} project preview`}
                                className={`absolute inset-0 w-full h-full ${project.imageClass || 'object-cover'} transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100`}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-4">
                                 <div className="w-16 h-16 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                                     {project.link ? <Eye size={24} /> : <ArrowUpRight size={24} />}
                                 </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-2">{project.category}</span>
                                <h3 className="text-3xl font-display font-bold text-[var(--text-main)] group-hover:text-[var(--text-secondary)] transition-colors">
                                    {project.title}
                                </h3>
                            </div>
                            <span className="text-[var(--text-muted)] font-mono">0{startIndex + index + 1}</span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="mt-24 flex justify-center items-center gap-4">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-4 border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-12 h-12 border font-bold transition-all ${
                                currentPage === page 
                                ? 'bg-[var(--text-main)] text-[var(--bg-main)] border-[var(--text-main)]' 
                                : 'border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--text-main)]'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-4 border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default WorksPage;
