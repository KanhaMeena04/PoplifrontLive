import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCircle2, Sparkles, Smartphone, Play, Download } from 'lucide-react';
import logo from '../assets/logo.png';
import { ANDROID_APK_URL } from '../constants';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-dark">
      {/* Background Glowing Mesh Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-[#31b7d6]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#fbc343]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10 text-center">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <NavLink 
            to="/" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-sm font-medium transition-all"
          >
            <ArrowLeft size={16} /> Back to Website
          </NavLink>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass-card p-8 md:p-14 rounded-[3rem] border border-white/15 shadow-[0_0_80px_rgba(230,36,132,0.2)] relative overflow-hidden"
        >
          {/* Top Decorative Sparkles */}
          <div className="absolute top-6 right-8 text-[#fbc343] opacity-80 animate-pulse">
            <Sparkles size={28} />
          </div>

          {/* Logo with Glow */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl animate-pulse" />
            <img 
              src={logo} 
              alt="Popli Logo" 
              className="h-24 md:h-32 w-auto object-contain relative z-10 mx-auto drop-shadow-[0_0_25px_rgba(230,36,132,0.6)] mix-blend-screen"
            />
          </div>

          {/* Brand Name Tag */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: '#e62484' }}>Popli</span>
            <div className="text-xs md:text-sm font-bold tracking-widest flex gap-1.5 ml-2">
              <span style={{ color: '#e62484' }}>CREATE.</span>
              <span style={{ color: '#31b7d6' }}>SHARE.</span>
              <span style={{ color: '#fbc343' }}>EARN.</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-6 tracking-tight leading-tight">
            App is <span className="text-gradient">Ready to Download</span>
          </h1>

          {/* Detailed Message */}
          <p className="text-lg md:text-xl text-white/80 font-sans max-w-xl mx-auto mb-10 leading-relaxed">
            Download the official <strong className="text-white">Popli Android App</strong> right now via direct APK release!
          </p>

          {/* Launching Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a 
              href={ANDROID_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/40 text-white text-sm font-medium hover:border-primary transition-all shadow-lg shadow-primary/10"
            >
              <Download className="text-[#31b7d6]" size={20} />
              <span>Download Android APK</span>
            </a>
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/15 text-white text-sm font-medium">
              <Smartphone className="text-primary" size={20} />
              <span>Apple App Store — Coming Soon</span>
            </div>
          </div>

          {/* Subscription / Notify Form */}
          <div className="max-w-md mx-auto">
            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-3 font-medium"
              >
                <CheckCircle2 size={22} />
                <span>Thank you! We'll notify you as soon as the app goes live.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for early access..."
                  required
                  className="flex-1 bg-white/5 border border-white/15 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 text-base"
                />
                <button
                  type="submit"
                  className="premium-button px-8 py-4 flex items-center justify-center gap-2 font-bold whitespace-nowrap"
                >
                  <Bell size={18} />
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
