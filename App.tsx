
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
import WorksPage from './components/WorksPage';
import ServicesPage from './components/ServicesPage';
import AgencyPage from './components/AgencyPage';
import ContactPage from './components/ContactPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AppContent: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Updated state type to include new pages
  const [view, setView] = useState<'home' | 'works' | 'services' | 'agency' | 'contact'>('home');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cleanup GSAP triggers on view change to prevent crashes
  useEffect(() => {
      return () => {
          ScrollTrigger.getAll().forEach(t => t.kill());
      };
  }, [view]);

  const handleNavigate = (target: string) => {
      // Simplified routing logic: always set view, scroll to top
      switch (target) {
          case 'works':
              setView('works');
              break;
          case 'services':
              setView('services');
              break;
          case 'agency':
              setView('agency');
              break;
          case 'contact':
              setView('contact');
              break;
          default:
              setView('home');
              break;
      }
      window.scrollTo(0, 0);
  };

  const renderView = () => {
      switch (view) {
          case 'works':
              return <WorksPage />;
          case 'services':
              return <ServicesPage />;
          case 'agency':
              return <AgencyPage />;
          case 'contact':
              return <ContactPage />;
          case 'home':
          default:
              return (
                <>
                    <Hero />
                    <Portfolio />
                    <Services />
                    <div id="agency">
                        <WhyUs />
                        <TechSpecs />
                    </div>
                    <Contact />
                </>
              );
      }
  };

  return (
    <div className="relative min-h-screen bg-concrete-900 text-white selection:bg-white selection:text-concrete-900 flex flex-col">
      
        {/* Global Noise Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        
        {/* Custom Cursor (Desktop Only) */}
        {!isMobile && <CustomCursor />}

        <Navbar currentView={view} onNavigate={handleNavigate} />

        <main className="relative z-10 w-full flex-grow flex flex-col">
           {renderView()}
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
