import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import contentData from '../../json/content.json';
import { Heart, UserPlus, Share2, MessageCircle } from 'lucide-react';
import appScreenshot from '../../assets/app-screenshot.jpeg';

const FloatingElement = ({ children, className, delay = 0, yOffset = 20 }: any) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, yOffset, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`absolute ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  
  const { hero } = contentData;

  useEffect(() => {
    // Reveal animation for text
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo('.hero-title-word', 
      { y: 100, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.15, delay: 0.2 }
    )
    .fromTo('.hero-subtitle', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    )
    .fromTo('.hero-cta',
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
      "-=0.4"
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-1/4 left-0 w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
        <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-0 w-[40vw] h-[40vw] bg-pink/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left z-20">
          <div className="flex flex-col items-center lg:items-start gap-2 mb-6 perspective-[1000px]">
            {['Earn', 'from Your', 'First Video'].map((word, i) => (
              <div key={i} className="overflow-hidden p-1">
                <h1 className={`hero-title-word text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter ${i === 0 ? 'text-gradient' : 'text-white'}`}>
                  {word}
                </h1>
              </div>
            ))}
          </div>
          
          <p className="hero-subtitle text-2xl md:text-3xl text-white/90 font-sans font-medium mb-12 max-w-xl mx-auto lg:mx-0">
            ₹5 per 1,000 views. No followers needed. Starting today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <NavLink to="/coming-soon" className="hero-cta premium-button relative group px-8 py-4 flex items-center justify-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-6 h-6 animate-pulse text-[#fbc343]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Coming Soon - Android
              </span>
            </NavLink>
            
            <NavLink to="/coming-soon" className="hero-cta px-8 py-4 rounded-full text-white font-bold text-xl hover:bg-white/10 transition-colors border-2 border-white/20">
              Coming Soon - iOS
            </NavLink>
          </div>
        </div>

        {/* Right Content: Floating 3D Phone Mockup */}
        <div className="flex-1 relative h-[600px] w-full max-w-md mx-auto hidden lg:flex items-center justify-center z-10 perspective-[1000px]">
          <motion.div 
            initial={{ rotateY: -20, rotateX: 10, opacity: 0, x: 50 }}
            animate={{ 
              rotateY: [-20, 20, -20],
              rotateX: [10, -5, 10],
              y: [-15, 15, -15],
              opacity: 1,
              x: 0
            }}
            transition={{ 
              opacity: { duration: 1, delay: 0.5 },
              x: { duration: 1, delay: 0.5, ease: "easeOut" },
              rotateY: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-72 h-[550px] rounded-[3rem] border-[8px] border-white/10 bg-dark/50 backdrop-blur-3xl shadow-[0_0_80px_rgba(212,175,55,0.4)] overflow-hidden"
          >
            {/* Screen Content Simulation */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark to-primary/30" />
            
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-3xl z-20" />

            {/* Real App Screenshot inside the phone */}
            <div className="absolute inset-0 bg-[#0f0a1c]">
               <img src={appScreenshot} alt="Popli App UI" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Floating UI Elements relative to the phone */}
          <div className="absolute inset-0 pointer-events-none">
            <FloatingElement className="-left-12 top-1/4" delay={0} yOffset={30}>
              <div className="glass-card p-4 flex items-center gap-3 shadow-lg shadow-pink/20">
                <div className="bg-pink/20 p-2 rounded-full"><Heart className="text-pink" size={20} /></div>
                <div>
                  <p className="text-sm font-bold text-white">12.5K</p>
                  <p className="text-xs text-white/60">Likes</p>
                </div>
              </div>
            </FloatingElement>
            
            <FloatingElement className="-right-16 bottom-1/3" delay={1} yOffset={-25}>
              <div className="glass-card p-4 flex items-center gap-3 shadow-lg shadow-primary/20">
                <div className="bg-primary/20 p-2 rounded-full"><UserPlus className="text-primary" size={20} /></div>
                <div>
                  <p className="text-sm font-bold text-white">New Follower</p>
                  <p className="text-xs text-white/60">@creator_pro</p>
                </div>
              </div>
            </FloatingElement>

            <FloatingElement className="-right-8 top-1/3" delay={2} yOffset={20}>
              <div className="glass-card p-3 rounded-full bg-secondary/10">
                <Share2 className="text-secondary" size={20} />
              </div>
            </FloatingElement>
            
            <FloatingElement className="-left-4 bottom-1/4" delay={1.5} yOffset={-15}>
              <div className="glass-card p-3 rounded-full bg-yellow/10">
                <MessageCircle className="text-yellow" size={20} />
              </div>
            </FloatingElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
