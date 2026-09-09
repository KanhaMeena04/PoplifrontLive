import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import navigationData from '../json/navigation.json';
import { ANDROID_APK_URL } from '../constants';

import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <img src={logo} alt="Popli Logo" className="h-14 md:h-16 w-auto object-contain mix-blend-screen" />
          <div className="flex flex-col items-start justify-center">
            <span className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#e62484' }}>Popli</span>
            <div className="text-[0.5rem] md:text-[0.6rem] font-bold tracking-widest mt-0.5">
              <span style={{ color: '#e62484' }}>CREATE. </span>
              <span style={{ color: '#31b7d6' }}>SHARE. </span>
              <span style={{ color: '#fbc343' }}>EARN.</span>
            </div>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navigationData.map((item) => (
            <NavLink 
              key={item.id} 
              to={item.path}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={({ isActive }) => 
                `relative text-sm font-medium transition-all duration-300 hover:text-white hover:-translate-y-0.5 ${isActive ? 'text-white' : 'text-white/60'}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <a 
            href={ANDROID_APK_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="premium-button inline-block text-center"
          >
            Download Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-dark-surface/95 backdrop-blur-xl border-b border-glass-border"
      >
        <div className="px-6 py-8 flex flex-col space-y-6">
          {navigationData.map((item) => (
            <NavLink 
              key={item.id} 
              to={item.path}
              onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={({ isActive }) => 
                `text-xl font-display font-medium transition-colors ${isActive ? 'text-white' : 'text-white/60'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a 
            href={ANDROID_APK_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="premium-button w-full py-3 mt-4 text-center block"
          >
            Download Now
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
