
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
    currentView: string;
    onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

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

  const handleHomeClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate('home');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${
        scrolled || currentView !== 'home'
          ? 'bg-[var(--bg-main)]/90 backdrop-blur-md border-[var(--border-color)] py-4'
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      {/* 
          LAYOUT CHANGE: 
          Replaced 'container mx-auto px-6' with 'w-full px-6 md:px-12'.
          This ensures the logo sits at the far left edge of the screen, not constrained by the center container.
      */}
      <div className="w-full px-6 md:px-12 flex justify-between md:grid md:grid-cols-3 items-center relative">
        
        {/* 
            LEFT: Logo (Visible only on subpages) 
            Added justify-self-start for grid alignment
        */}
        <div 
            className={`transition-opacity duration-300 z-50 justify-self-start ${currentView !== 'home' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <a 
                href="#home" 
                onClick={handleHomeClick}
                className="border-[2px] border-[var(--text-main)] px-3 py-1.5 inline-block hover:bg-[var(--text-main)] group transition-colors duration-300"
            >
                <span className="font-logo font-bold text-xl tracking-[0.2em] text-[var(--text-main)] group-hover:text-[var(--bg-main)] transition-colors duration-300 block">
                    DIZAIN
                </span>
            </a>
        </div>

        {/* 
            CENTER: Desktop Menu 
            Removed absolute positioning, used grid alignment
        */}
        <div className="hidden md:flex justify-self-center items-center gap-8 lg:gap-12 w-max">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link)}
              className={`text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors duration-300 font-bold ${
                  currentView === link.id ? 'text-[var(--text-main)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* 
            RIGHT: Controls (Desktop Lang + Mobile Menu) 
        */}
        <div className="justify-self-end flex items-center gap-6 z-50 ml-auto md:ml-0">
            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Desktop Language Switcher */}
            <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => setLanguage('sl')}
                  className={`text-[10px] font-bold uppercase transition-colors tracking-widest ${language === 'sl' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
                >
                  SLO
                </button>
                <span className="text-[var(--text-muted)] text-[10px]">/</span>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-[10px] font-bold uppercase transition-colors tracking-widest ${language === 'en' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
                >
                  ENG
                </button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-4">
                {/* Mobile Lang Switcher */}
                <div className="flex items-center gap-2 mr-2">
                    <button 
                    onClick={() => setLanguage('sl')}
                    className={`text-xs font-bold uppercase ${language === 'sl' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}
                    >
                    SL
                    </button>
                    <span className="text-[var(--text-muted)]">/</span>
                    <button 
                    onClick={() => setLanguage('en')}
                    className={`text-xs font-bold uppercase ${language === 'en' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}
                    >
                    EN
                    </button>
                </div>
                <button
                className="text-[var(--text-main)]"
                onClick={() => setMenuOpen(!menuOpen)}
                >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="fixed inset-0 bg-[var(--bg-main)] flex flex-col items-center justify-center gap-8 md:hidden h-screen w-screen z-40"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-2xl font-display font-bold uppercase tracking-widest hover:text-[var(--text-secondary)] ${currentView === link.id ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}
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
