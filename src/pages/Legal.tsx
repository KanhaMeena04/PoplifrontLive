import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import legalData from '../json/legal.json';

type LegalKey = keyof typeof legalData;

const Legal: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  
  let key: LegalKey | null = null;
  if (path === 'privacy-policy') key = 'privacy-policy';
  else if (path === 'terms') key = 'terms';
  else if (path === 'guidelines') key = 'guidelines';
  else if (path === 'cookies') key = 'cookies';

  const data = key && legalData[key] ? legalData[key] : null;

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen relative"
    >
      {/* Background Gradient */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-12 border-b border-glass-border pb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            {data.title}
          </h1>
          <p className="text-white/40 text-sm">Last Updated: {data.lastUpdated}</p>
        </div>

        <div className="space-y-8 text-white/80 font-sans leading-relaxed">
          {data.content.map((block: any, idx: number) => {
            if (block.type === 'p') {
              return <p key={idx} className="text-lg">{block.text}</p>;
            }
            if (block.type === 'h2') {
              return <h2 key={idx} className="text-2xl font-display font-semibold text-white mt-8 mb-4">{block.text}</h2>;
            }
            if (block.type === 'ul') {
              return (
                <ul key={idx} className="list-disc pl-6 space-y-3">
                  {block.items.map((item: string, i: number) => (
                    <li key={i} className="text-lg">
                      {/* Bold the first part if it has a colon */}
                      {item.includes(':') ? (
                        <>
                          <strong className="text-white">{item.split(':')[0]}:</strong>
                          {item.substring(item.indexOf(':') + 1)}
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Legal;
