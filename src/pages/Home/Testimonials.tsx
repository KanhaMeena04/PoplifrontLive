import React, { useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya',
    city: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&h=800&fit=crop',
    quote: 'Earned ₹850 in my first month without any brand deals or 10K followers.',
    stars: 5,
  },
  {
    name: 'Rahul',
    city: 'Indore',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=800&fit=crop',
    quote: 'Finally a platform that pays you for your hard work from day one.',
    stars: 5,
  },
  {
    name: 'Anjali',
    city: 'Lucknow',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop',
    quote: 'The ₹5 per 1K views is real. I withdrew my first earnings via UPI instantly!',
    stars: 5,
  }
];

const Testimonials: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            What Creators Are Saying
          </h2>
          <p className="text-white/60 text-lg">Real stories from our growing community.</p>
        </div>
        
        {/* Expandable Horizontal Accordion (3D effect) */}
        <div className="flex flex-col md:flex-row h-[600px] md:h-[500px] gap-2 md:gap-4 w-full">
          {testimonials.map((t, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;
            
            return (
              <motion.div 
                key={idx} 
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{
                  flex: isHovered ? (window.innerWidth > 768 ? 3 : 1) : (isAnyHovered ? 1 : 2),
                }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="relative rounded-3xl overflow-hidden cursor-pointer group border border-white/10 shadow-2xl flex-1 md:min-w-[100px] h-full"
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={t.bgImage} 
                    alt={t.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />
                  {/* Subtle gradient overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end h-full pointer-events-none">
                  <div className="flex items-center gap-4 mb-2">
                    <img 
                      src={t.image} 
                      alt={t.name}
                      className="w-12 h-12 rounded-full border-2 border-white/20 object-cover shadow-lg flex-shrink-0"
                    />
                    <div className="min-w-0 drop-shadow-md">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-xl md:text-2xl text-white truncate">{t.name}</h3>
                      </div>
                      <p className="text-white/80 text-sm truncate">{t.city}</p>
                    </div>
                  </div>

                  {/* Expanded Quote (fully visible when hovered on desktop) */}
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: isHovered || window.innerWidth < 768 ? 1 : 0, 
                      height: isHovered || window.innerWidth < 768 ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(t.stars)].map((_, starIdx) => (
                        <span key={starIdx} className="text-yellow text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-white/90 italic text-lg leading-relaxed drop-shadow-md">
                      "{t.quote}"
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
