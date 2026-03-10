
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    details: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Project: ${formData.project}\n\nDetails: ${formData.details}`,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an invalid response (not JSON). Please try again later.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', project: '', details: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] pt-32 pb-24 relative overflow-hidden flex flex-col transition-colors duration-500">
       {/* Background Ambience */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[var(--noise-opacity)] mix-blend-overlay"></div>
       <div className="absolute left-0 top-1/2 w-[400px] h-[400px] bg-[var(--text-main)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Context & Info */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="font-display text-6xl md:text-8xl font-bold text-[var(--text-main)] mb-8 leading-[0.9]">
                    {t.nav.contact}
                </h1>
                
                <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed max-w-md mb-12 border-l border-[var(--border-color)] pl-6">
                    {t.contact.subtitle}
                </p>
                
                <div className="mb-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] mb-4">Lokacija</h3>
                    <p className="text-[var(--text-secondary)]">Karantanska ulica 28<br/>2000 Maribor<br/>Slovenija</p>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] mb-4">Kontakt</h3>
                    <p className="text-[var(--text-secondary)]">dizain.slo@gmail.com<br/>+386 70311260</p>
                </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 md:p-12 shadow-2xl relative"
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3 group">
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-main)] mb-2 block">
                                {t.contact.placeholders.name}
                            </label>
                            <input 
                                name="name"
                                type="text" 
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] p-4 text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]/50 focus:bg-[var(--text-main)]/5 transition-all duration-300 placeholder-[var(--text-muted)]"
                            />
                        </div>
                        <div className="space-y-3 group">
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-main)] mb-2 block">
                                {t.contact.placeholders.email}
                            </label>
                            <input 
                                name="email"
                                type="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] p-4 text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]/50 focus:bg-[var(--text-main)]/5 transition-all duration-300 placeholder-[var(--text-muted)]"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 group">
                        <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-main)] mb-2 block">
                            {t.contact.placeholders.project}
                        </label>
                        <input 
                            name="project"
                            type="text" 
                            value={formData.project}
                            onChange={handleChange}
                            required
                            className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] p-4 text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]/50 focus:bg-[var(--text-main)]/5 transition-all duration-300 placeholder-[var(--text-muted)]"
                        />
                    </div>

                    <div className="space-y-3 group">
                        <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-main)] mb-2 block">
                            {t.contact.placeholders.details}
                        </label>
                        <textarea 
                            name="details"
                            rows={4}
                            value={formData.details}
                            onChange={handleChange}
                            required
                            className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] p-4 text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]/50 focus:bg-[var(--text-main)]/5 transition-all duration-300 resize-none placeholder-[var(--text-muted)]"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full py-6 bg-[var(--text-main)] text-[var(--bg-main)] font-display font-bold uppercase tracking-[0.2em] hover:bg-[var(--text-secondary)] disabled:bg-[var(--text-muted)] disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group mt-4"
                    >
                        {status === 'loading' ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Sending...
                          </>
                        ) : status === 'success' ? (
                          <>
                            <CheckCircle size={20} />
                            Sent Successfully
                          </>
                        ) : (
                          <>
                            {t.contact.send}
                            <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </>
                        )}
                    </button>

                    {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-900/20 border border-green-500/30 text-green-400 text-sm text-center"
                      >
                        Hvala, vaše sporočilo je bilo poslano!
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-900/20 border border-red-500/30 text-red-400 text-sm text-center flex items-center justify-center gap-2"
                      >
                        <AlertCircle size={16} />
                        {errorMessage}
                      </motion.div>
                    )}
                </form>
            </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
