import React from 'react';
import Hero from './Hero';
import TrustBar from './TrustBar';
import Features from '../Features';
import OneNumber from './OneNumber';
import HowItWorks from './HowItWorks';
import EarningsCalculator from './EarningsCalculator';
import Testimonials from './Testimonials';
import CTASection from './CTASection';
import GlobeReachGraphic from '../../components/GlobeReachGraphic';
import { motion } from 'framer-motion';
import homeFeatures from '../../json/homeFeatures.json';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Hero />
      <TrustBar />
      <OneNumber />
      <Features data={homeFeatures} />
      <HowItWorks />
      
      {/* 3D Interactive Reach Globe Section */}
      <section className="py-20 max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Nationwide <span className="text-gradient">Reach & Monetization</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-sans">
            Real-time video views and instant creator earnings expanding across India.
          </p>
        </div>
        <GlobeReachGraphic />
      </section>

      <EarningsCalculator />
      <Testimonials />
      <CTASection />
    </motion.div>
  );
};

export default Home;
