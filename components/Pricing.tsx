import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "OSNOVNI",
    price: "490 €",
    description: "Idealno za manjšo predstavitev podjetja ali dejavnosti.",
    features: [
      "SSL varnost",
      "SEO optimizacija",
      "Mobilna odzivnost",
      "Urejanje domene in gostovanja",
      "Kontaktni obrazec",
      "Piškotki + GDPR ureditev"
    ]
  },
  {
    name: "POSLOVNI",
    price: "990 €",
    description: "Naprednejša stran s celovito predstavitvijo ponudbe.",
    features: [
      "Vse iz Osnovnega paketa",
      "CMS za samostojno urejanje",
      "Napredne animacije",
      "Enostavna objava novic",
      "Analiza konkurence",
      "Do 15 podstrani"
    ],
    highlight: true
  },
  {
    name: "PREMIUM",
    price: "1900 €",
    description: "Profesionalna rešitev za zahtevnejša podjetja.",
    features: [
      "Popolnoma unikatna rešitev po meri",
      "Neomejeni popravki",
      "Napredne funkcionalnosti",
      "StoryBrand analiza vsebine",
      "Koledar dogodkov",
      "Integracija e-mail marketinga"
    ]
  }
];

interface PricingProps {
  onNavigate?: (target: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const handleInquiry = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Navigation handler not provided and contact section not found');
      }
    }
  };

  return (
    <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden transition-colors duration-500">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-main)] mb-6">
            Cenik Izdelave
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            Transparentne cene za vrhunske spletne rešitve. Izberite paket, ki najbolj ustreza vašim potrebam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative flex flex-col p-8 rounded-2xl border ${
                tier.highlight 
                  ? 'bg-[var(--bg-tertiary)] border-[var(--border-color-hover)] shadow-2xl scale-105 z-10' 
                  : 'bg-[var(--bg-main)]/50 border-[var(--border-color)] hover:border-[var(--border-color-hover)]'
              } transition-all duration-300`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--text-main)] text-[var(--bg-main)] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Najbolj priljubljeno
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[var(--text-main)] uppercase tracking-wider mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-display font-bold text-[var(--text-main)]">{tier.price}</span>
                  {tier.price !== "Po dogovoru" && <span className="text-[var(--text-muted)] text-sm">/ projekt</span>}
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="flex-grow mb-8">
                <ul className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleInquiry}
                className={`w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wide text-xs md:text-sm transition-all duration-300 ${
                  tier.highlight
                    ? 'bg-[var(--text-main)] text-[var(--bg-main)] hover:bg-[var(--text-secondary)]'
                    : 'bg-[var(--text-main)]/5 text-[var(--text-main)] hover:bg-[var(--text-main)]/10 border border-[var(--border-color)]'
                }`}
              >
                Povpraševanje
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-[var(--text-muted)] text-sm">
                * Cene so informativne narave in se lahko prilagodijo glede na specifične zahteve projekta.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
