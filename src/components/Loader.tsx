import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../assets/logo.png';

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Wait a bit after 100% before triggering complete
          return 100;
        }
        // Random increment for a more organic feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] bg-dark-bg flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          y: '-100%',
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
        }}
      >
        {/* Animated Background Blobs */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/3 w-[30vw] h-[30vw] bg-purple-500/10 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="mb-8"
          >
            {/* Popli Logo Placeholder/Text */}
            <img src={logo} alt="Popli Logo" className="h-32 md:h-48 w-auto object-contain drop-shadow-2xl mix-blend-screen" />
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          
          <motion.div 
            className="mt-4 text-sm font-sans text-white/60 uppercase tracking-widest font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {progress}% — Loading Experience
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
