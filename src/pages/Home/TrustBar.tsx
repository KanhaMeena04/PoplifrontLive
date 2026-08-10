import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

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

const TrustBar: React.FC = () => {
  const stats = [
    { value: "1000+", label: "Creators" },
    { value: "10", label: "Cities" },
    { value: "₹5", label: "per 1K Views" },
    { value: "Free", label: "to Join", noAnim: true }
  ];

  return (
    <div className="w-full bg-dark py-16 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
          Trusted by Top Creators
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-50" />
      </div>
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="stat-card glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors duration-300 rounded-2xl md:rounded-3xl shadow-[0_8px_32px_rgba(212,175,55,0.05)] hover:shadow-[0_8px_32px_rgba(212,175,55,0.2)]"
            >
              <AnimatedNumber 
                noAnim={stat.noAnim} 
                value={stat.value} 
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" 
              />
              <p className="text-white/70 font-medium text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
