
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

interface ProjectDetail {
  label: string;
  value: string;
  x: number;
  y: number;
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  details: ProjectDetail[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Nourish",
    category: "3D Product Experience",
    image: "https://picsum.photos/800/600?random=1",
    description: "Interactive 3D skincare showcase utilizing WebGL.",
    details: [
      { label: "Tech", value: "Three.js", x: 20, y: 20 },
      { label: "Performance", value: "60 FPS", x: 70, y: 15 },
      { label: "Interaction", value: "WebGL", x: 80, y: 80 },
    ]
  },
  {
    id: 2,
    title: "Vortex",
    category: "FinTech App",
    image: "https://picsum.photos/800/600?random=2",
    description: "Secure, motion-driven banking interface.",
    details: [
      { label: "Security", value: "AES-256", x: 10, y: 80 },
      { label: "Speed", value: "<100ms", x: 85, y: 30 },
    ]
  },
  {
    id: 3,
    title: "Aeon",
    category: "Architecture",
    image: "https://picsum.photos/800/600?random=3",
    description: "Minimalist portfolio for sustainable firm.",
    details: [
      { label: "CMS", value: "Sanity", x: 15, y: 15 },
      { label: "Design", value: "Minimal", x: 75, y: 75 },
    ]
  }
];

const PortfolioCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-10%" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full md:w-[48%] lg:w-[32%] aspect-[4/5] flex-shrink-0 cursor-pointer overflow-hidden bg-neutral-900 border border-neutral-800"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="w-full h-[120%] -top-[10%] relative">
            <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7 }}
            />
        </motion.div>
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
      
      {/* Floating Details (Nourish Effect) */}
      {project.details.map((detail, i) => (
        <motion.div
          key={i}
          className="absolute z-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0,
            x: isHovered ? 0 : (Math.random() - 0.5) * 50,
            y: isHovered ? 0 : (Math.random() - 0.5) * 50
          }}
          transition={{ duration: 0.4, delay: i * 0.1, type: "spring" }}
          style={{ left: `${detail.x}%`, top: `${detail.y}%` }}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex flex-col items-center shadow-xl">
            <span className="text-[8px] uppercase tracking-wider text-neutral-300">{detail.label}</span>
            <span className="text-xs font-bold text-white">{detail.value}</span>
          </div>
          {/* Connecting line visualization could go here */}
        </motion.div>
      ))}

      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <div className="overflow-hidden mb-2">
                <motion.p 
                    className="text-xs font-bold text-neutral-400 uppercase tracking-widest"
                    animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                >
                    {project.category}
                </motion.p>
            </div>
            <h3 className="text-4xl font-display font-bold text-white mb-2 mix-blend-difference">{project.title}</h3>
            <motion.div 
                className="h-px bg-white/50 my-4 origin-left"
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            />
             <motion.p 
                className="text-neutral-300 text-sm max-w-[80%]"
                animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
             >
                {project.description}
            </motion.p>
        </div>
      </div>
      
      {/* Number Badge */}
      <div className="absolute top-0 right-0 p-6 z-20">
        <div className="text-4xl font-display text-transparent text-outline opacity-30 group-hover:opacity-100 transition-opacity duration-500">
            0{index + 1}
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="relative py-32 bg-concrete-900 z-10">
      <div className="container mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-bold uppercase text-white leading-none"
          >
            Featured <br/> <span className="text-neutral-500">Works</span>
          </motion.h2>
          
          <div className="mt-8 md:mt-0 flex gap-4">
             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                 <span className="text-xs">01</span>
             </div>
             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white text-black">
                 <span className="text-xs">All</span>
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between gap-y-16">
          {projects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
    