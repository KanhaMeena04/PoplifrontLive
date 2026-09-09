import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ANDROID_APK_URL } from '../../constants';

const OneNumber: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-dark">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-12 tracking-tighter flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
            <span className="text-8xl md:text-[120px] text-gradient leading-none">₹5</span>
            <span className="mt-2 md:mt-4">per 1,000 views</span>
          </h2>
          
          <div className="text-xl md:text-2xl text-white/80 space-y-3 font-light mb-12">
            <p>From your <strong className="text-white font-bold">FIRST</strong> video.</p>
            <p>Zero followers required. Zero waiting.</p>
          </div>

          <a 
            href={ANDROID_APK_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-10 py-5 rounded-full bg-white text-dark font-bold text-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
          >
            Download for Android
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </motion.div>
      </div>
      
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default OneNumber;
