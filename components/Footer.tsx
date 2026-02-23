
import React from 'react';
import { Instagram, Linkedin, Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-neutral-900">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <div className="border-[2px] border-white px-3 py-1.5 mb-6 inline-block">
            <span className="font-logo font-bold text-xl tracking-[0.2em] text-white block">
              DIZAIN
            </span>
          </div>
          <p className="text-neutral-500 text-sm">© 2024 Lignotie d.o.o. All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Github size={20} /></a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
