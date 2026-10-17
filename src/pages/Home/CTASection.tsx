import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, QrCode } from 'lucide-react';
import { ANDROID_APK_URL } from '../../constants';

const CTASection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const qrUrl = ANDROID_APK_URL;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section ref={containerRef} className="h-screen w-full relative flex items-center justify-center p-6 md:p-12 overflow-hidden perspective-[1000px] bg-dark">
      <motion.div 
        style={{ scale, opacity, y }}
        className="w-full h-full max-w-5xl mx-auto rounded-[3rem] md:rounded-[4rem] relative overflow-hidden flex flex-col items-center justify-center text-center p-8 border border-white/10 shadow-[0_0_100px_rgba(147,51,234,0.15)]"
      >
        {/* Massive Glowing Orb Background */}
        <div className="absolute inset-0 bg-dark z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] md:w-[80vw] md:h-[80vw] bg-[radial-gradient(circle,rgba(147,51,234,0.25)_0%,rgba(212,175,55,0.1)_30%,transparent_70%)] rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Inner Glass Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/80 z-0" />

        <div className="relative z-10 flex flex-col items-center w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-12 tracking-tighter"
          >
            Start Earning Today. <br/><span className="text-gradient">Download Popli App</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center gap-8 mb-12"
          >
            <a 
              href={ANDROID_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-2xl overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all flex items-center gap-3"
            >
              <Download className="w-7 h-7 text-[#fbc343]" />
              Download for Android
            </a>
            
            <div className="flex flex-col items-center gap-3">
              <a href={ANDROID_APK_URL} target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-40 h-40 bg-white p-2 rounded-2xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-purple-500/20">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`} 
                    alt="Scan to Download App" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </a>
              <p className="text-white/80 font-medium flex items-center gap-2">
                <QrCode size={16} className="text-[#31b7d6]" />
                <span>Scan QR to Download App</span>
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 text-white/80 font-medium bg-white/5 px-8 py-4 rounded-full border border-white/10"
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow">🚀</span>
              <span className="font-bold text-white">Coming Soon</span>
            </div>
            <span className="text-white/30">|</span>
            <span>Free App</span>
            <span className="text-white/30">|</span>
            <span>Play Store & App Store</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
