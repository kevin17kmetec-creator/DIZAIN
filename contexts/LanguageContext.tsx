
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sl' | 'en';

interface Translations {
  nav: {
    work: string;
    services: string;
    agency: string;
    contact: string;
  };
  hero: {
    subtitle: string;
    cta: string;
    scroll: string;
  };
  portfolio: {
    title: string;
    featured: string;
    works: string;
    viewAll: string;
    tech: string;
    perf: string;
    interact: string;
  };
  services: {
    title: string;
    expertise: string;
    items: string[];
  };
  whyUs: {
    title: string;
    standard: string;
    desc: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  techSpecs: {
    title: string;
    desc: string;
    chartTitle: string;
    labels: {
      seo: string;
      load: string;
      resp: string;
      sec: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    placeholders: {
      name: string;
      email: string;
      project: string;
      details: string;
    };
    send: string;
  };
  preview: {
      back: string;
      connecting: string;
      live: string;
      loadingEnv: string;
  };
}

const translations: Record<Language, Translations> = {
  sl: {
    nav: {
      work: 'Reference',
      services: 'Storitve',
      agency: 'Agencija',
      contact: 'Kontakt',
    },
    hero: {
      subtitle: 'Kjer inovacija sreča arhitekturo',
      cta: 'Poglej v Prihodnost',
      scroll: 'Drsite za raziskovanje',
    },
    portfolio: {
      title: 'Izbrane Reference',
      featured: 'Izbrane',
      works: 'Reference',
      viewAll: 'Poglej Vse Projekte',
      tech: 'Tehnologija',
      perf: 'Zmogljivost',
      interact: 'Interakcija',
    },
    services: {
      title: 'Sposobnosti',
      expertise: 'Naše Znanje',
      items: ["Strategija", "Oblikovanje", "Razvoj", "Marketing"],
    },
    whyUs: {
      title: 'Standard',
      standard: 'Standard',
      desc: 'Delujemo na stičišču oblikovanja in inženiringa. Naša filozofija je preprosta: gradimo čudovite stvari, ki delujejo brezhibno.',
      items: [
        {
          title: "Natančnost",
          desc: "Implementacija kompleksnih dizajnov do zadnjega piksla. Kodo obravnavamo kot arhitekturo."
        },
        {
          title: "Hitrost",
          desc: "Optimizirano za takojšnje nalaganje z uporabo naprednega predpomnjenja in 'edge' računalništva."
        },
        {
          title: "Razširljivost",
          desc: "Modularni sistemi, zgrajeni za rast z vašim podjetjem, od startupa do korporacije."
        }
      ]
    },
    techSpecs: {
      title: 'Zmogljivost na Prvem Mestu',
      desc: 'Vizualna podoba ne pomeni nič, če uporabnik čaka. Inženiramo za hitrost in dosegamo skoraj popolne rezultate na vseh področjih.',
      chartTitle: 'Google Lighthouse Zmogljivost',
      labels: {
        seo: 'SEO Ocena',
        load: 'Čas Nalaganja',
        resp: 'Odzivnost',
        sec: 'Varnost'
      }
    },
    contact: {
      title: 'Gradimo Skupaj',
      subtitle: 'Ste pripravljeni na digitalno prihodnost?',
      placeholders: {
        name: 'Ime',
        email: 'E-pošta',
        project: 'Kaj gradite?',
        details: 'Povejte nam več o podrobnostih...'
      },
      send: 'Pošlji Povpraševanje'
    },
    preview: {
        back: 'Nazaj',
        connecting: 'Povezovanje...',
        live: 'Predogled v živo',
        loadingEnv: 'Nalaganje zunanjega okolja...'
    }
  },
  en: {
    nav: {
      work: 'Work',
      services: 'Services',
      agency: 'Agency',
      contact: 'Contact',
    },
    hero: {
      subtitle: 'Where innovation meets architecture',
      cta: 'See the Future',
      scroll: 'Scroll to Explore',
    },
    portfolio: {
      title: 'Selected Work',
      featured: 'Featured',
      works: 'Works',
      viewAll: 'View All Projects',
      tech: 'Tech',
      perf: 'Performance',
      interact: 'Interaction',
    },
    services: {
      title: 'Capabilities',
      expertise: 'Our Expertise',
      items: ["Strategy", "Design", "Development", "Marketing"],
    },
    whyUs: {
      title: 'Standard',
      standard: 'Standard',
      desc: 'We operate at the intersection of design and engineering. Our philosophy is simple: build beautiful things that work flawlessly.',
      items: [
        {
          title: "Precision",
          desc: "Pixel-perfect implementation of complex designs. We treat code as architecture."
        },
        {
          title: "Speed",
          desc: "Optimized for sub-second load times using advanced caching and edge computing."
        },
        {
          title: "Scale",
          desc: "Modular systems built to grow with your business, from startup to enterprise."
        }
      ]
    },
    techSpecs: {
      title: 'Performance First',
      desc: 'Visuals mean nothing if the user waits. We engineer for speed, achieving near-perfect Lighthouse scores across the board.',
      chartTitle: 'Google Lighthouse Performance',
      labels: {
        seo: 'SEO Score',
        load: 'Load Time',
        resp: 'Responsive',
        sec: 'Security'
      }
    },
    contact: {
      title: "Let's Build",
      subtitle: 'Ready to future-proof your digital presence?',
      placeholders: {
        name: 'Name',
        email: 'Email',
        project: 'What are you building?',
        details: 'Tell us about the details...'
      },
      send: 'Send Request'
    },
    preview: {
        back: 'Back',
        connecting: 'Connecting...',
        live: 'Live Preview',
        loadingEnv: 'Loading External Environment...'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('sl');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
