
import React, { useState, useEffect } from 'react';
import { X, Loader2, ArrowLeft, Menu, ExternalLink } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectPreviewPageProps {
  url: string;
  onBack: () => void;
}

const ProjectPreviewPage: React.FC<ProjectPreviewPageProps> = ({ url, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // CRITICAL: Kill all scroll triggers to prevent interference/crashes when iframe loads
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    // Lock body scroll to prevent double scrollbars
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
      // Re-enable scrolling when leaving
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-concrete-900 flex flex-col w-full h-full">
      
      {/* 
          TRIGGER BUTTON (Visible when menu is closed)
          Discreet floating button, moved lower (top-32) to avoid headers
      */}
      <AnimatePresence>
        {!menuOpen && (
            <motion.button
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(true)}
                className="absolute top-32 left-6 z-50 bg-black/80 text-white p-4 hover:bg-white hover:text-black transition-colors duration-300 border border-white/10 rounded-full shadow-2xl backdrop-blur-md group"
            >
                <Menu size={24} className="group-hover:scale-110 transition-transform" />
            </motion.button>
        )}
      </AnimatePresence>

      {/* 
          SLIDE-IN SIDEBAR 
          Contains the controls, slides in from left.
      */}
      <AnimatePresence>
        {menuOpen && (
            <>
                {/* Backdrop to close on click outside */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMenuOpen(false)}
                    className="absolute inset-0 bg-black/40 z-40 backdrop-blur-sm cursor-pointer"
                />

                {/* The Drawer Panel */}
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-0 left-0 h-full w-full max-w-sm bg-concrete-900/95 backdrop-blur-xl border-r border-white/10 z-50 p-12 flex flex-col shadow-2xl"
                >
                    {/* Drawer Header */}
                    <div className="flex justify-between items-center mb-16">
                        <span className="font-display font-bold tracking-widest text-white text-xl">MENU</span>
                        <button 
                            onClick={() => setMenuOpen(false)} 
                            className="text-white hover:rotate-90 transition-transform duration-300 p-2 hover:bg-white/10 rounded-full"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="space-y-12">
                         {/* Status Indicator */}
                         <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Status</div>
                            <div className="flex items-center gap-4 text-white bg-black/40 p-4 rounded border border-white/5">
                                <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`}></div>
                                <span className="font-display font-bold tracking-widest text-sm">
                                    {loading ? t.preview.connecting : t.preview.live}
                                </span>
                            </div>
                         </div>
                         
                         {/* Project Source URL (Clickable) */}
                         <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Source</div>
                            <a 
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-3 text-white/50 hover:text-white transition-colors font-mono text-xs break-all border-l-2 border-white/10 hover:border-white pl-4 py-2"
                            >
                                <span>{url}</span>
                                <ExternalLink size={12} className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                         </div>
                    </div>

                    {/* Footer / Actions */}
                    <div className="mt-auto">
                        <button
                            onClick={onBack}
                            className="w-full bg-white text-black py-6 flex items-center justify-center gap-4 hover:bg-neutral-200 transition-colors group tracking-widest font-bold font-display uppercase text-sm"
                        >
                            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                            {t.preview.back}
                        </button>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      {/* Loading State Overlay */}
      <AnimatePresence>
        {loading && (
            <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-concrete-900 z-30 pointer-events-none"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                    <Loader2 className="animate-spin text-white relative z-10 w-12 h-12 mb-8 opacity-50" />
                </div>
                
                <span className="font-display font-bold tracking-[0.3em] text-white animate-pulse text-lg">
                    DIZAIN PREVIEW
                </span>
                <span className="text-neutral-500 text-xs mt-2 font-mono">{t.preview.loadingEnv}</span>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Iframe */}
      <iframe
        src={url}
        className="w-full h-full border-0 bg-white"
        onLoad={() => setLoading(false)}
        title="Project Live Preview"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups"
      />
    </div>
  );
};

export default ProjectPreviewPage;
