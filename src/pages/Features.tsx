import React from 'react';
import { motion } from 'framer-motion';
import featuresData from '../json/features.json';
import * as Icons from 'lucide-react';

interface FeatureData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  data?: FeatureData[];
}

const Features: React.FC<FeaturesProps> = ({ data = featuresData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 relative"
    >
      {/* Background Gradient */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Platform <span className="text-gradient-accent">Features</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-sans">
            Everything you need to create, share, and monetize your content. Built with cutting-edge technology for the modern creator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1500px]">
          {data.map((feature, index) => {
            // @ts-ignore
            const Icon = Icons[feature.icon] || Icons.Code;
            
            return (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.3 }}
                className="feature-card glass-card p-8 group hover:-translate-y-4 hover:border-accent/50 hover:bg-dark-surface-2 transition-all duration-500 relative overflow-hidden shadow-2xl shadow-black/20"
                style={{ zIndex: data.length - index }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  className="w-16 h-16 rounded-2xl bg-dark-surface border border-glass-border flex items-center justify-center mb-6 text-white group-hover:text-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner"
                >
                  <Icon size={32} strokeWidth={1.5} />
                </motion.div>
                
                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 group-hover:text-white transition-colors relative z-10">
                  {feature.title}
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Features;
