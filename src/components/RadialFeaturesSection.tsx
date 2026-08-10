import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import logo from '../assets/logo.png';

export interface AppFeature {
  title: string;
  description: string;
  icon: string;
}

interface RadialFeaturesSectionProps {
  features: AppFeature[];
}

const nodeColors = [
  {
    headerBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
    border: 'border-orange-500',
    text: 'text-orange-400',
    iconBg: 'bg-orange-500/20 text-orange-400',
    pointerBorder: 'border-orange-500',
    arcColor: '#f97316'
  },
  {
    headerBg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    border: 'border-purple-500',
    text: 'text-purple-400',
    iconBg: 'bg-purple-500/20 text-purple-400',
    pointerBorder: 'border-purple-500',
    arcColor: '#a855f7'
  },
  {
    headerBg: 'bg-gradient-to-r from-rose-500 to-red-600',
    border: 'border-rose-500',
    text: 'text-rose-400',
    iconBg: 'bg-rose-500/20 text-rose-400',
    pointerBorder: 'border-rose-500',
    arcColor: '#f43f5e'
  },
  {
    headerBg: 'bg-gradient-to-r from-sky-500 to-blue-600',
    border: 'border-sky-500',
    text: 'text-sky-400',
    iconBg: 'bg-sky-500/20 text-sky-400',
    pointerBorder: 'border-sky-500',
    arcColor: '#0ea5e9'
  },
  {
    headerBg: 'bg-gradient-to-r from-teal-500 to-emerald-600',
    border: 'border-teal-500',
    text: 'text-teal-400',
    iconBg: 'bg-teal-500/20 text-teal-400',
    pointerBorder: 'border-teal-500',
    arcColor: '#14b8a6'
  },
  {
    headerBg: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    border: 'border-amber-500',
    text: 'text-amber-400',
    iconBg: 'bg-amber-500/20 text-amber-400',
    pointerBorder: 'border-amber-500',
    arcColor: '#eab308'
  }
];

export const RadialFeaturesSection: React.FC<RadialFeaturesSectionProps> = ({ features }) => {
  // Take primary 6 features for the radial infographic layout
  const primaryFeatures = features.slice(0, 6);
  const remainingFeatures = features.slice(6);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8 overflow-hidden">
      {/* Title Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4"
        >
          Powerful Features
        </motion.h2>
        <p className="text-white/70 text-lg max-w-xl mx-auto">
          Everything you need built right into the Popli app.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 mx-auto rounded-full mt-4" />
      </div>

      {/* DESKTOP RADIAL INFOGRAPHIC LAYOUT (lg and up) */}
      <div className="hidden lg:block relative w-full min-h-[750px] max-w-5xl mx-auto my-12">
        {/* Decorative Radial Rays background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border border-white/5 animate-pulse" />
          <div className="w-[450px] h-[450px] rounded-full border border-dashed border-white/10" />
        </div>

        {/* CENTER LOGO HUB */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="w-80 h-80 rounded-full bg-slate-900/95 border-4 border-white/20 p-6 flex flex-col items-center justify-center text-center shadow-[0_0_60px_rgba(230,36,132,0.3)] relative group"
          >
            {/* Outer Segmented Colorful Rings (Infographic screenshot style) */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-500 border-r-cyan-400 border-b-amber-400 border-l-purple-500 animate-spin-slow pointer-events-none" />

            <div className="w-24 h-24 mb-3 rounded-full bg-white/10 p-2 flex items-center justify-center shadow-inner">
              <img src={logo} alt="Popli Logo" className="w-full h-full object-contain mix-blend-screen" />
            </div>

            <h3 className="text-xl font-black tracking-tight text-white font-display uppercase">
              POPLI APP
            </h3>
            <span className="text-xs font-bold tracking-widest text-primary mb-2">
              POWERFUL FEATURES
            </span>
            <p className="text-white/70 text-xs px-4 leading-relaxed line-clamp-3">
              India's Next Generation Creator Platform with automated monetization & real-time analytics.
            </p>
          </motion.div>
        </div>

        {/* 6 SURROUNDING INFOGRAPHIC NODES (Radial positions around center) */}
        {primaryFeatures.map((feat, idx) => {
          const color = nodeColors[idx % nodeColors.length];
          // @ts-ignore
          const Icon = Icons[feat.icon] || Icons.Zap;

          // Radial positioning angles: Top-Left, Top-Right, Mid-Left, Mid-Right, Bottom-Left, Bottom-Right
          const positions = [
            'top-4 left-4',         // Node 1 (Top Left)
            'top-4 right-4',        // Node 2 (Top Right)
            'top-1/2 -translate-y-1/2 left-0',   // Node 3 (Mid Left)
            'top-1/2 -translate-y-1/2 right-0',  // Node 4 (Mid Right)
            'bottom-4 left-12',     // Node 5 (Bottom Left)
            'bottom-4 right-12',    // Node 6 (Bottom Right)
          ];

          // Pointer orientations towards the center hub
          const pointerStyles = [
            'after:content-[""] after:absolute after:-bottom-3 after:right-8 after:border-t-[12px] after:border-t-slate-900 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent',
            'after:content-[""] after:absolute after:-bottom-3 after:left-8 after:border-t-[12px] after:border-t-slate-900 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent',
            'after:content-[""] after:absolute after:top-1/2 after:-right-3 after:-translate-y-1/2 after:border-l-[12px] after:border-l-slate-900 after:border-t-[10px] after:border-t-transparent after:border-b-[10px] after:border-b-transparent',
            'after:content-[""] after:absolute after:top-1/2 after:-left-3 after:-translate-y-1/2 after:border-r-[12px] after:border-r-slate-900 after:border-t-[10px] after:border-t-transparent after:border-b-[10px] after:border-b-transparent',
            'after:content-[""] after:absolute after:-top-3 after:right-12 after:border-b-[12px] after:border-b-slate-900 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent',
            'after:content-[""] after:absolute after:-top-3 after:left-12 after:border-b-[12px] after:border-b-slate-900 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent'
          ];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.06, zIndex: 30 }}
              className={`absolute ${positions[idx]} w-72 z-10`}
            >
              {/* Infographic Circle Card */}
              <div className={`relative glass-card p-5 rounded-[2rem] border-2 ${color.border} bg-slate-900/95 shadow-2xl ${pointerStyles[idx]}`}>
                {/* Header Banner Arc */}
                <div className={`w-full py-1.5 px-4 rounded-full ${color.headerBg} text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center justify-center gap-2 shadow`}>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <Icon size={14} />
                  </div>
                  <span className="truncate">{feat.title}</span>
                </div>

                {/* Content */}
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${color.iconBg} flex items-center justify-center flex-shrink-0 font-bold shadow-inner`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-white/80 text-xs leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE & TABLET INFOGRAPHIC GRID (under lg) */}
      <div className="block lg:hidden relative py-4">
        {/* Mobile Central Hub Banner */}
        <div className="w-full max-w-sm mx-auto mb-10 p-6 rounded-3xl bg-slate-900 border-2 border-primary/40 text-center shadow-xl relative">
          <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-white/10 p-2 flex items-center justify-center">
            <img src={logo} alt="Popli Logo" className="w-full h-full object-contain mix-blend-screen" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">POPLI FEATURES</h3>
          <p className="text-white/70 text-xs mt-1">Key highlights of the app</p>
        </div>

        {/* Infographic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {primaryFeatures.map((feat, idx) => {
            const color = nodeColors[idx % nodeColors.length];
            // @ts-ignore
            const Icon = Icons[feat.icon] || Icons.Zap;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`glass-card p-5 rounded-3xl border-2 ${color.border} bg-slate-900/95 relative shadow-lg`}
              >
                <div className={`w-full py-1.5 px-4 rounded-full ${color.headerBg} text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center justify-center gap-2`}>
                  <Icon size={16} />
                  <span>{feat.title}</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ADDITIONAL FEATURES GRID (remaining features if any) */}
      {remainingFeatures.length > 0 && (
        <div className="mt-16 pt-12 border-t border-white/10">
          <h3 className="text-xl font-bold font-display text-white text-center mb-8">
            More Built-in App Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {remainingFeatures.map((feat, idx) => {
              // @ts-ignore
              const Icon = Icons[feat.icon] || Icons.CheckCircle;
              return (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-primary/40 transition-colors flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{feat.title}</h4>
                    <p className="text-white/60 text-xs leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default RadialFeaturesSection;
