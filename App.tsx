
import React, { useEffect, useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import TechSpecs from './components/TechSpecs';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { LanguageProvider } from './contexts/LanguageContext';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lazy load non-home pages for performance optimization
const WorksPage = lazy(() => import('./components/WorksPage'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const AgencyPage = lazy(() => import('./components/AgencyPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const ProjectPreviewPage = lazy(() => import('./components/ProjectPreviewPage'));

type ViewState = 'home' | 'works' | 'services' | 'agency' | 'contact' | 'preview';

const AppContent: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState<ViewState>('home');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previousView, setPreviousView] = useState<ViewState>('home');

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

  const handlePreview = (url: string) => {
      setPreviousView(view);
      setPreviewUrl(url);
      setView('preview');
  };

  const handleClosePreview = () => {
      setPreviewUrl(null);
      setView(previousView);
  };

  const renderView = () => {
      switch (view) {
          case 'preview':
              return previewUrl ? (
                  <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}>
                      <ProjectPreviewPage url={previewUrl} onBack={handleClosePreview} />
                  </Suspense>
              ) : null;
          case 'works':
              return (
                  <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}>
                      <WorksPage onPreview={handlePreview} />
                  </Suspense>
              );
          case 'services':
              return (
                  <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}>
                      <ServicesPage onNavigate={handleNavigate} />
                  </Suspense>
              );
          case 'agency':
              return (
                  <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}>
                      <AgencyPage />
                  </Suspense>
              );
          case 'contact':
              return (
                  <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}>
                      <ContactPage />
                  </Suspense>
              );
          case 'home':
          default:
              return (
                <>
                    <Hero />
                    <Portfolio onPreview={handlePreview} />
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
    <div className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-[var(--text-main)] selection:text-[var(--bg-main)] flex flex-col transition-colors duration-500">
      
        {/* Global Noise Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[var(--noise-opacity)] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        
        {/* Custom Cursor (Desktop Only) */}
        {!isMobile && view !== 'preview' && <CustomCursor />}

        {/* Hide Navbar in preview mode */}
        {view !== 'preview' && <Navbar currentView={view} onNavigate={handleNavigate} />}

        <main className={`relative z-10 w-full flex-grow flex flex-col ${view === 'preview' ? 'h-screen overflow-hidden' : ''}`}>
           {renderView()}
        </main>

        {/* Back to Top Button */}
        {view !== 'preview' && <BackToTop />}

        {view !== 'preview' && <Footer />}
    </div>
  );
};

import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
