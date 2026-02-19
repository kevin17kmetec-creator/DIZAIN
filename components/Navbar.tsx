
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
    currentView: string;
    onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated: All items are now 'page' type for full view switching
  const navLinks = [
    { name: t.nav.work, id: 'works', type: 'page' },
    { name: t.nav.services, id: 'services', type: 'page' },
    { name: t.nav.agency, id: 'agency', type: 'page' },
    { name: t.nav.contact, id: 'contact', type: 'page' },
  ];

  const handleNavClick = (e: React.MouseEvent, link: {id: string, type: string}) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(link.id);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setMenuOpen(false);
      onNavigate('home');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${
        scrolled || currentView !== 'home'
          ? 'bg-concrete-900/90 backdrop-blur-md border-white/10 py-4'
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo / Home Link */}
        <a href="#" onClick={handleLogoClick} className="text-xl font-display font-bold tracking-widest text-white z-50">
          DIZAIN
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link)}
              className={`text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors duration-300 font-bold ${
                  currentView === link.id ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 border-l border-white/20 pl-6 ml-2">
            <button 
              onClick={() => setLanguage('sl')}
              className={`text-[10px] font-bold uppercase transition-colors tracking-widest ${language === 'sl' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            >
              SLO
            </button>
            <span className="text-neutral-700 text-[10px]">/</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`text-[10px] font-bold uppercase transition-colors tracking-widest ${language === 'en' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
            >
              ENG
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4 z-50">
            {/* Mobile Lang Switcher */}
            <div className="flex items-center gap-2 mr-2">
                <button 
                onClick={() => setLanguage('sl')}
                className={`text-xs font-bold uppercase ${language === 'sl' ? 'text-white' : 'text-neutral-600'}`}
                >
                SL
                </button>
                <span className="text-neutral-700">/</span>
                <button 
                onClick={() => setLanguage('en')}
                className={`text-xs font-bold uppercase ${language === 'en' ? 'text-white' : 'text-neutral-600'}`}
                >
                EN
                </button>
            </div>
            <button
            className="text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="fixed inset-0 bg-concrete-900 flex flex-col items-center justify-center gap-8 md:hidden h-screen w-screen z-40"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-2xl font-display font-bold uppercase tracking-widest hover:text-neutral-400 ${currentView === link.id ? 'text-white' : 'text-neutral-500'}`}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
