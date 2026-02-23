
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from './Portfolio';
import { ArrowUpRight, Eye } from 'lucide-react';

interface WorksPageProps {
    onPreview: (url: string) => void;
}

const WorksPage: React.FC<WorksPageProps> = ({ onPreview }) => {
  const { t } = useLanguage();

  const handleProjectClick = (link?: string) => {
      if (link) {
          onPreview(link);
      }
  };

  return (
    <div className="min-h-screen bg-concrete-900 pt-32 pb-24 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-neutral-900 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24"
        >
            <h1 className="font-display text-5xl md:text-8xl font-bold uppercase text-white mb-6">
                {t.portfolio.works}
            </h1>
            <div className="w-24 h-1 bg-white mb-8" />
            <p className="text-neutral-400 text-xl max-w-2xl leading-relaxed">
                {t.whyUs.desc}
            </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group cursor-pointer"
                    onClick={() => handleProjectClick(project.link)}
                >
                    <div className="relative overflow-hidden aspect-[4/3] mb-6 border border-white/10 bg-neutral-900">
                        <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                        <img 
                            src={project.image} 
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-4">
                             <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                                 {project.link ? <Eye size={24} /> : <ArrowUpRight size={24} />}
                             </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-2">{project.category}</span>
                            <h3 className="text-3xl font-display font-bold text-white group-hover:text-neutral-300 transition-colors">
                                {project.title}
                            </h3>
                        </div>
                        <span className="text-neutral-600 font-mono">0{index + 1}</span>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default WorksPage;
