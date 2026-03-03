
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const TechSpecs: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const data = [
    { name: 'Others', speed: 65, fill: 'var(--bg-tertiary)' },
    { name: 'Avg', speed: 80, fill: 'var(--text-secondary)' },
    { name: 'DIZAIN', speed: 99, fill: 'var(--text-main)' },
  ];

  return (
    <section className="py-32 bg-[var(--bg-main)] border-y border-[var(--border-color)] transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-4xl mb-6 text-[var(--text-main)]"
            >
              {t.techSpecs.title}
            </motion.h2>
            <p className="text-[var(--text-secondary)] mb-12 max-w-md">
              {t.techSpecs.desc}
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 border border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
                <div className="text-4xl font-bold text-[var(--text-main)] mb-2">99</div>
                <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">{t.techSpecs.labels.seo}</div>
              </div>
              <div className="p-6 border border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
                <div className="text-4xl font-bold text-[var(--text-main)] mb-2">&lt; 0.8s</div>
                <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">{t.techSpecs.labels.load}</div>
              </div>
              <div className="p-6 border border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
                <div className="text-4xl font-bold text-[var(--text-main)] mb-2">100%</div>
                <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">{t.techSpecs.labels.resp}</div>
              </div>
              <div className="p-6 border border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
                <div className="text-4xl font-bold text-[var(--text-main)] mb-2">A++</div>
                <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">{t.techSpecs.labels.sec}</div>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full bg-[var(--bg-secondary)]/20 p-8 border border-[var(--border-color)] rounded-xl flex flex-col justify-between">
             <h3 className="text-sm uppercase tracking-widest text-[var(--text-muted)] mb-4 shrink-0">{t.techSpecs.chartTitle}</h3>
             <div ref={containerRef} className="w-full h-[300px]">
               {dimensions.width > 0 && (
                  <BarChart 
                    width={dimensions.width} 
                    height={dimensions.height} 
                    data={data} 
                    layout="vertical" 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="var(--text-muted)" 
                      fontSize={12} 
                      width={80} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      cursor={{fill: 'var(--text-main)', opacity: 0.05}}
                      contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                    />
                    <Bar dataKey="speed" barSize={32} radius={[0, 4, 4, 0]} isAnimationActive={false}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                      ))}
                    </Bar>
                  </BarChart>
               )}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
