
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
    { name: 'Others', speed: 65, fill: '#333' },
    { name: 'Avg', speed: 80, fill: '#555' },
    { name: 'DIZAIN', speed: 99, fill: '#fff' },
  ];

  return (
    <section className="py-32 bg-black border-y border-neutral-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-4xl mb-6"
            >
              {t.techSpecs.title}
            </motion.h2>
            <p className="text-neutral-400 mb-12 max-w-md">
              {t.techSpecs.desc}
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 border border-neutral-800 bg-neutral-900/50">
                <div className="text-4xl font-bold text-white mb-2">99</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">{t.techSpecs.labels.seo}</div>
              </div>
              <div className="p-6 border border-neutral-800 bg-neutral-900/50">
                <div className="text-4xl font-bold text-white mb-2">&lt; 0.8s</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">{t.techSpecs.labels.load}</div>
              </div>
              <div className="p-6 border border-neutral-800 bg-neutral-900/50">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">{t.techSpecs.labels.resp}</div>
              </div>
              <div className="p-6 border border-neutral-800 bg-neutral-900/50">
                <div className="text-4xl font-bold text-white mb-2">A++</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">{t.techSpecs.labels.sec}</div>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full bg-neutral-900/20 p-8 border border-neutral-800 rounded-xl flex flex-col justify-between">
             <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-4 shrink-0">{t.techSpecs.chartTitle}</h3>
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
                      stroke="#666" 
                      fontSize={12} 
                      width={80} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: '#050505', borderColor: '#333', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
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
