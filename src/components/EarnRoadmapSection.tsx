import React from 'react';
import { motion } from 'framer-motion';

export interface EarnWay {
  icon: string;
  title: string;
  points: string[];
}

interface EarnRoadmapSectionProps {
  ways: EarnWay[];
}

const colorThemes = [
  {
    bg: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-400',
    text: 'text-cyan-400',
    ring: 'bg-cyan-500',
    badgeBg: 'bg-cyan-500/10',
    accentHex: '#06b6d4',
  },
  {
    bg: 'from-amber-500/20 to-yellow-600/20',
    border: 'border-amber-400',
    text: 'text-amber-400',
    ring: 'bg-amber-500',
    badgeBg: 'bg-amber-500/10',
    accentHex: '#f59e0b',
  },
  {
    bg: 'from-pink-500/20 to-rose-600/20',
    border: 'border-pink-400',
    text: 'text-pink-400',
    ring: 'bg-pink-500',
    badgeBg: 'bg-pink-500/10',
    accentHex: '#ec4899',
  },
  {
    bg: 'from-emerald-500/20 to-teal-600/20',
    border: 'border-emerald-400',
    text: 'text-emerald-400',
    ring: 'bg-emerald-500',
    badgeBg: 'bg-emerald-500/10',
    accentHex: '#10b981',
  },
];

export const EarnRoadmapSection: React.FC<EarnRoadmapSectionProps> = ({ ways }) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4"
        >
          Four Ways to Earn
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 mx-auto rounded-full" />
      </div>

      {/* DESKTOP SERPENTINE ROADMAP (lg and up) */}
      <div className="hidden lg:block relative min-h-[620px] py-8">
        {/* SVG Serpentine Road Path */}
        <div className="absolute inset-0 top-32 pointer-events-none z-0">
          <svg className="w-full h-80 overflow-visible" viewBox="0 0 1200 320" fill="none">
            {/* Road Outer Shadow/Glow */}
            <path
              d="M 100,160 C 250,20 350,300 500,160 C 650,20 750,300 900,160 C 1000,70 1100,200 1150,160"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="60"
              strokeLinecap="round"
            />
            {/* Dark Road Ribbon */}
            <path
              d="M 100,160 C 250,20 350,300 500,160 C 650,20 750,300 900,160 C 1000,70 1100,200 1150,160"
              stroke="#1e293b"
              strokeWidth="44"
              strokeLinecap="round"
            />
            {/* Road Edge Highlights */}
            <path
              d="M 100,160 C 250,20 350,300 500,160 C 650,20 750,300 900,160 C 1000,70 1100,200 1150,160"
              stroke="#334155"
              strokeWidth="48"
              strokeLinecap="round"
              style={{ mixBlendMode: 'overlay' }}
            />
            {/* Dashed White Center Line */}
            <path
              d="M 100,160 C 250,20 350,300 500,160 C 650,20 750,300 900,160 C 1000,70 1100,200 1150,160"
              stroke="#ffffff"
              strokeWidth="4"
              strokeDasharray="14 14"
              strokeLinecap="round"
              className="opacity-80"
            />
          </svg>
        </div>

        {/* 4 Serpentine Columns */}
        <div className="relative z-10 grid grid-cols-4 gap-6 h-full">
          {ways.map((way, idx) => {
            const theme = colorThemes[idx % colorThemes.length];
            const isCardOnTop = idx % 2 === 0; // 0 & 2 card on top, 1 & 3 card on bottom
            const stepNum = `0${idx + 1}`;

            return (
              <div key={idx} className="flex flex-col items-center justify-between min-h-[560px]">
                {isCardOnTop ? (
                  <>
                    {/* Top Card */}
                    <motion.div
                      initial={{ opacity: 0, y: -40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      whileHover={{ scale: 1.04, y: -6 }}
                      className={`w-full glass-card p-6 rounded-[2.5rem] border-2 ${theme.border} bg-slate-900/90 shadow-2xl relative group`}
                    >
                      {/* Outer Color Ring / Badge Top Header */}
                      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                        <div className={`w-12 h-12 rounded-full ${theme.ring} flex items-center justify-center text-2xl shadow-lg text-white font-bold`}>
                          {way.icon}
                        </div>
                        <h3 className={`text-lg font-bold font-display tracking-wider ${theme.text}`}>
                          {way.title}
                        </h3>
                      </div>
                      <ul className="space-y-2.5">
                        {way.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-white/80 text-sm">
                            <span className={`w-2 h-2 rounded-full ${theme.ring} mt-1.5 flex-shrink-0`} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      {/* Pointer Arrow pointing down to circle */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-slate-800" />
                    </motion.div>

                    {/* Connecting Vertical Line */}
                    <div className="w-1 h-12 bg-gradient-to-b from-slate-700 to-transparent my-2" />

                    {/* Number Circle Badge on the Road */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                      className="relative my-auto"
                    >
                      <div className={`w-24 h-24 rounded-full bg-white border-4 ${theme.border} flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.2)] group hover:scale-110 transition-transform duration-300`}>
                        <span className={`text-3xl font-black font-display ${theme.text}`}>
                          {stepNum}
                        </span>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <>
                    {/* Number Circle Badge on the Road */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                      className="relative my-auto"
                    >
                      <div className={`w-24 h-24 rounded-full bg-white border-4 ${theme.border} flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.2)] group hover:scale-110 transition-transform duration-300`}>
                        <span className={`text-3xl font-black font-display ${theme.text}`}>
                          {stepNum}
                        </span>
                      </div>
                    </motion.div>

                    {/* Connecting Vertical Line */}
                    <div className="w-1 h-12 bg-gradient-to-b from-transparent to-slate-700 my-2" />

                    {/* Bottom Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      whileHover={{ scale: 1.04, y: 6 }}
                      className={`w-full glass-card p-6 rounded-[2.5rem] border-2 ${theme.border} bg-slate-900/90 shadow-2xl relative group`}
                    >
                      {/* Pointer Arrow pointing up to circle */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-slate-800" />
                      
                      {/* Outer Color Ring / Badge Top Header */}
                      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                        <div className={`w-12 h-12 rounded-full ${theme.ring} flex items-center justify-center text-2xl shadow-lg text-white font-bold`}>
                          {way.icon}
                        </div>
                        <h3 className={`text-lg font-bold font-display tracking-wider ${theme.text}`}>
                          {way.title}
                        </h3>
                      </div>
                      <ul className="space-y-2.5">
                        {way.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-white/80 text-sm">
                            <span className={`w-2 h-2 rounded-full ${theme.ring} mt-1.5 flex-shrink-0`} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE & TABLET ROADMAP (under lg) */}
      <div className="block lg:hidden relative py-4">
        {/* Central Vertical Wavy Line */}
        <div className="absolute left-6 top-0 bottom-0 w-2 bg-gradient-to-b from-cyan-500 via-pink-500 to-amber-500 rounded-full opacity-40" />

        <div className="space-y-10 pl-12 relative">
          {ways.map((way, idx) => {
            const theme = colorThemes[idx % colorThemes.length];
            const stepNum = `0${idx + 1}`;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Numbered Bubble Badge on vertical line */}
                <div className={`absolute -left-[3.25rem] top-4 w-12 h-12 rounded-full bg-white border-2 ${theme.border} flex items-center justify-center shadow-lg z-10`}>
                  <span className={`text-sm font-black font-display ${theme.text}`}>
                    {stepNum}
                  </span>
                </div>

                {/* Mobile Card */}
                <div className={`glass-card p-6 rounded-3xl border-2 ${theme.border} bg-slate-900/90 shadow-xl`}>
                  <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
                    <div className={`w-10 h-10 rounded-full ${theme.ring} flex items-center justify-center text-xl shadow text-white font-bold`}>
                      {way.icon}
                    </div>
                    <h3 className={`text-base font-bold font-display ${theme.text}`}>
                      {way.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {way.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-white/80 text-sm">
                        <span className={`w-2 h-2 rounded-full ${theme.ring} mt-1.5 flex-shrink-0`} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default EarnRoadmapSection;
