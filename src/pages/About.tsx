import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { Target, Eye, Heart, Scale, Search, Smartphone, ChevronDown, Clock, Building, Mail, Download } from 'lucide-react';
import { ANDROID_APK_URL } from '../constants';

const values = [
  { icon: Heart, title: "Creator First", desc: "Every decision benefits the creator." },
  { icon: Scale, title: "Fairness", desc: "Same ₹5 per 1K whether you're in Mumbai or Jaipur." },
  { icon: Search, title: "Transparency", desc: "You see exactly how your earnings are calculated." },
  { icon: Smartphone, title: "Built for Bharat", desc: "Hindi first. 3G optimized. Tier 2/3 focused." },
];

const stats = [
  { value: "100+", label: "Founding Creators" },
  { value: "10", label: "Cities Launching" },
  { value: "₹5", label: "Per 1K Views Rate" },
  { value: "2026", label: "Founded" },
  { value: "Rajasthan", label: "Headquartered", noAnim: true },
  { value: "Free", label: "Always", noAnim: true },
];

const faqs = [
  { q: "How do I earn on Popli?", a: "₹5 per 1,000 genuine views from your very first video. Plus gifts, challenges and subscriptions." },
  { q: "Do I need followers to earn?", a: "Zero followers required. Upload Video 1. Start earning." },
  { q: "How do I withdraw money?", a: "UPI or bank transfer. Minimum ₹500. No maximum." },
  { q: "Is Popli free?", a: "100% free. Always will be." },
  { q: "Where is Popli available?", a: "Android now. iOS coming soon. Available across India." },
  { q: "Who can join?", a: "Any Indian creator. Any content category. Any city." },
];

const AnimatedNumber: React.FC<{ value: string; className: string; noAnim?: boolean }> = ({ value, className, noAnim }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (noAnim) return;
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
  }, [isInView, value, noAnim]);

  const getInitialValue = (val: string) => {
    if (noAnim) return val;
    const match = val.match(/^([^0-9]*)([\d,]+)([^0-9]*)$/);
    if (match) return `${match[1]}0${match[3]}`;
    return val;
  };

  return (
    <div ref={ref} className={className}>
      {getInitialValue(value)}
    </div>
  );
};

const FAQItem: React.FC<{ faq: any; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-4 border border-white/5 transition-colors duration-300 hover:border-primary/30">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-xl font-display font-bold text-white">{faq.q}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-white/70 text-lg leading-relaxed whitespace-pre-line">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const About: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen relative bg-dark overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      {/* Section 1: Page Headline */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center mb-32 mt-8">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tighter text-white"
        >
          Built in Bharat.<br />
          <span className="text-gradient">For Bharat's Creators.</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl text-white/80 font-sans font-medium leading-relaxed"
        >
          We are from tier 2 India.<br />
          We understand the problem personally.<br />
          <span className="text-primary font-bold">That's why we built the solution.</span>
        </motion.p>
      </div>

      {/* Section 3: Mission & Vision */}
      <div className="max-w-5xl mx-auto px-6 mb-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Target className="w-8 h-8 text-primary mb-3 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            <h2 className="text-xl font-display font-bold text-white mb-3">Our Mission</h2>
            <p className="text-white/80 text-base leading-relaxed relative z-10">
              "To ensure every Indian creator earns fairly from their content — regardless of where they live or how many followers they have."
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-accent/50 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Eye className="w-8 h-8 text-accent mb-3 drop-shadow-[0_0_15px_rgba(184,115,51,0.5)]" />
            <h2 className="text-xl font-display font-bold text-white mb-3">Our Vision</h2>
            <p className="text-white/80 text-base leading-relaxed relative z-10">
              "A Bharat where creator income is as real and reliable as a monthly salary."
            </p>
          </motion.div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Our Values</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-50" />
        </div>
        
        <div className="relative overflow-hidden w-full py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
          <motion.div 
            className="flex items-center gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {values.map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div 
                      key={`${i}-${idx}`}
                      className="glass-card p-6 w-[280px] rounded-2xl text-center shadow-[0_8px_32px_rgba(212,175,55,0.05)] hover:shadow-[0_8px_32px_rgba(212,175,55,0.2)] hover:border-primary/30 transition-all duration-500 relative overflow-hidden group flex-shrink-0"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-12 h-12 rounded-xl bg-dark-surface border border-white/10 flex items-center justify-center text-primary mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-display font-bold text-white mb-2 relative z-10">{val.title}</h3>
                      <p className="text-white/70 font-medium text-sm relative z-10">{val.desc}</p>
                    </div>
                  )
                })}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Section 4: The Numbers */}
      <div className="max-w-5xl mx-auto px-6 mb-32 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Popli by Numbers</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-5 rounded-2xl text-center group hover:border-primary/50 transition-all duration-500"
            >
              <AnimatedNumber noAnim={stat.noAnim} value={stat.value} className="text-2xl md:text-4xl font-display font-bold text-gradient mb-1 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
              <p className="text-white/70 font-medium text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 5 & 6: FAQ & Company Details */}
      <div className="max-w-7xl mx-auto px-6 mb-32 relative z-10 flex flex-col lg:flex-row gap-12">
        {/* Company Details (Left Side) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/3 space-y-8"
        >
          <div className="glass-card p-10 rounded-3xl bg-dark-surface/80 border-white/10">
            <Building className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-6">Registered Office</h3>
            <p className="text-white/80 text-lg leading-relaxed mb-4 font-bold">Popli Technologies Private Limited</p>
            <p className="text-white/60 text-lg leading-relaxed">
              NH-27, Bijoliya<br />
              Bhilwara, Rajasthan
            </p>
          </div>
          
          <div className="glass-card p-10 rounded-3xl bg-dark-surface/80 border-white/10">
            <Mail className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-display font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-6">
              <div>
                <p className="text-white/60 text-sm uppercase tracking-wider mb-1 font-bold">For Creators</p>
                <a href="mailto:popli.admin@gmail.com" className="text-primary hover:text-white transition-colors text-lg break-all">popli.admin@gmail.com</a>
              </div>
              <div>
                <p className="text-white/60 text-sm uppercase tracking-wider mb-1 font-bold">Brands & Partnerships</p>
                <a href="mailto:popli.admin@gmail.com" className="text-primary hover:text-white transition-colors text-lg break-all">popli.admin@gmail.com</a>
              </div>
              <div>
                <p className="text-white/60 text-sm uppercase tracking-wider mb-1 font-bold">Press & Media</p>
                <a href="mailto:popli.admin@gmail.com" className="text-primary hover:text-white transition-colors text-lg break-all">popli.admin@gmail.com</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section (Right Side) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-2/3"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Common Questions</h2>
            <div className="w-16 h-1 bg-primary rounded-full opacity-50" />
          </div>
          
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <FAQItem 
                key={idx} 
                faq={faq} 
                isOpen={openFaq === idx} 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)} 
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section 8: Download CTA */}
      <div className="text-center pb-12 px-6">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-10 leading-tight">
          Join 1,000+ Creators Building<br/>
          <span className="text-gradient">Their Income on Popli</span>
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

export default About;
