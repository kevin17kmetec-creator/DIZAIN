
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'root') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: t.nav.work, href: '#portfolio' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.agency, href: '#why-us' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-concrete-900/80 backdrop-blur-md border-white/10 py-4'
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      {/* Changed justify-between to justify-end to align items right since logo is removed */}
      <div className="container mx-auto px-6 flex justify-end items-center">
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-300 font-bold"
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
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-2xl font-display font-bold uppercase tracking-widest text-white hover:text-neutral-400"
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
