
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import TechSpecs from './components/TechSpecs';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Simple mobile check
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen bg-concrete-900 text-white selection:bg-white selection:text-concrete-900">
      {/* Global Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      {/* Custom Cursor (Desktop Only) */}
      {!isMobile && <CustomCursor />}

      <Navbar />

      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <Portfolio />
        <Services />
        <WhyUs />
        <TechSpecs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
