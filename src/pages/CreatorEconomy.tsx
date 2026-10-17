import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { MapPin, X, Check, ArrowRight, Briefcase, Download } from 'lucide-react';
import GlobeReachGraphic from '../components/GlobeReachGraphic';
import { ANDROID_APK_URL } from '../constants';

const problemStats = [
  { value: "50 Million", label: "Indian creators on social media" },
  { value: "99%", label: "Earn ₹0 from their content" },
  { value: "10,000", label: "Followers Instagram needs to pay you" },
  { value: "₹0", label: "What a Bhilwara creator with 50K views earns today" }
];

const opportunityStats = [
  { value: "₹5,000 Cr", label: "Indian creator economy size in 2026" },
  { value: "40%", label: "Growing every year" },
  { value: "70%", label: "Of all Indian creators are in tier 2/3 cities" },
  { value: "0%", label: "Of that 70% have access to monetization" }
];

const cities = [
  { name: "Jaipur", creators: 24, top: "35%", left: "35%" },
  { name: "Lucknow", creators: 18, top: "35%", left: "60%" },
  { name: "Bhilwara", creators: 3, top: "42%", left: "32%" },
  { name: "Kota", creators: 8, top: "42%", left: "38%" },
  { name: "Varanasi", creators: 12, top: "45%", left: "65%" },
  { name: "Indore", creators: 45, top: "55%", left: "40%" },
];

const getInitialValue = (val: string) => {
  const match = val.match(/^([^0-9]*)([\d,]+)([^0-9]*)$/);
  if (match) return `${match[1]}0${match[3]}`;
  return val;
};

const AnimatedNumber: React.FC<{ value: string; className: string }> = ({ value, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const match = value.match(/^([^0-9]*)([\d,]+)([^0-9]*)$/);
      if (match) {
        const prefix = match[1];
        const numericString = match[2].replace(/,/g, '');
        const suffix = match[3];
        const numericValue = parseInt(numericString, 10);
        
        if (!isNaN(numericValue) && numericValue > 0) {
          animate(0, numericValue, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate: (latest) => {
              if (ref.current) {
                const formattedNumber = Math.floor(latest).toLocaleString('en-IN');
                ref.current.innerText = `${prefix}${formattedNumber}${suffix}`;
              }
            }
          });
        }
      }
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className={className}>
      {getInitialValue(value)}
    </div>
  );
};

const CreatorEconomy: React.FC = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen bg-dark text-white overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      {/* Section 1: Page Headline */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center mb-32 mt-8">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 tracking-tighter"
        >
          India's Creator Economy Is Broken.<br />
          <span className="text-gradient">We're Fixing It.</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl text-white/80 font-sans font-medium"
        >
          50 million creators. 99% earning zero.<br />
          Not anymore.
        </motion.p>
      </div>

      {/* Section 2: The Problem ("The Harsh Reality") */}
      <div className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">The Harsh Reality</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-50" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[1000px]">
          {problemStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-card p-8 rounded-3xl text-center shadow-[0_8px_32px_rgba(212,175,55,0.05)] hover:shadow-[0_8px_32px_rgba(212,175,55,0.2)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <AnimatedNumber value={stat.value} className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] relative z-10" />
              <p className="text-white/80 font-medium text-lg relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 3: The Opportunity */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">The Creator Economy Opportunity</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {opportunityStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 rounded-3xl text-center group hover:border-primary/50 transition-all duration-500"
            >
              <AnimatedNumber value={stat.value} className="text-5xl md:text-6xl font-display font-bold text-gradient mb-4 group-hover:scale-110 transition-transform duration-500" />
              <p className="text-white/80 font-medium text-xl">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 4: Popli's Solution (Before vs After) */}
      <div className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">How Popli Changes Everything</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-green-500 mx-auto rounded-full opacity-50" />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Before Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-red-950/20 border border-red-500/20 rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                <X size={24} strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-display font-bold text-red-400">Before Popli</h3>
            </div>
            <ul className="space-y-6">
              {[
                "Need 10,000 followers to earn",
                "Wait months or years to see money",
                "Earn ₹0 despite getting thousands of views",
                "Only metro creators succeed and get brand deals"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-white/70 text-lg">
                  <X className="mt-1 text-red-500/50 flex-shrink-0" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-green-950/20 border border-green-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <Check size={24} strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-display font-bold text-green-400">After Popli</h3>
            </div>
            <ul className="space-y-6 relative z-10">
              {[
                "Zero followers needed to monetize",
                "Earn from Video 1 instantly",
                "₹5 per 1,000 genuine views guaranteed",
                "Bhilwara creator = Mumbai creator"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-white/90 text-lg font-medium">
                  <Check className="mt-1 text-green-500 flex-shrink-0" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Section 5: City-Wise Creator Spotlight & 3D Globe Reach Graphic */}
      <div className="max-w-5xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">Creators Earning Across India & Beyond</h2>
          <p className="text-white/60 text-lg">Watch video reach and creator earnings flow across cities in real-time.</p>
        </div>
        
        <GlobeReachGraphic />
      </div>

      {/* Section 6: Brand Section */}
      <div className="max-w-4xl mx-auto px-6 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 md:p-14 rounded-3xl text-center border-primary/20 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[60px]" />
          
          <Briefcase className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">Are you a Brand?</h2>
          
          <div className="text-xl md:text-2xl text-white/80 font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
            Reach 50,000+ tier 2/3 creators and their authentic audiences.
            <br/><br/>
            <span className="text-primary font-bold">Real creators. Real reach. Real India.</span>
          </div>
          
          <button className="premium-button-secondary text-lg flex items-center gap-2 mx-auto">
            Contact Us for Brand Partnerships
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>

      {/* Section 7: Download Here Too */}
      <div className="text-center pb-12 px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-10 leading-tight">
          Be Part of the Creator Economy Revolution
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href={ANDROID_APK_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="premium-button text-xl px-12 py-5 inline-flex items-center justify-center gap-3 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            <Download className="w-6 h-6 text-[#fbc343]" />
            Download for Android
          </a>
        </motion.div>
      </div>
      
    </motion.div>
  );
};

export default CreatorEconomy;
