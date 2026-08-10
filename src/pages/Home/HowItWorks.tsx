import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: "📱",
      title: "UPLOAD",
      description: "Create a short video (15-60s).\nUpload on Popli app. Free. Instant."
    },
    {
      id: 2,
      icon: "👁️",
      title: "GET VIEWS",
      description: "People discover your video.\nEvery 10s genuine view counts."
    },
    {
      id: 3,
      icon: "💰",
      title: "EARN MONEY",
      description: "₹5 per 1,000 views credited hourly.\nWithdraw via UPI anytime."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-dark">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 hiw-card-marquee">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-white/60 text-lg">Three simple steps to start earning.</p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden w-[100vw] left-1/2 -ml-[50vw] [mask-image:_linear-gradient(to_right,transparent_0,_black_150px,_black_calc(100%-150px),transparent_100%)] py-10">
          <motion.div
            className="flex items-center gap-8 pl-8 w-max"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25
            }}
          >
            {/* Render 2 identical sets for seamless looping */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-8">
                {steps.map((step) => (
                  <div key={`${step.id}-${i}`} className="relative group min-w-[350px]">
                    <div className="glass-card p-10 h-[320px] flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500 rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                      <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center text-4xl mb-6 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                        {step.icon}
                      </div>
                      
                      {/* Step Number Badge */}
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-dark-surface border border-white/10 shadow-lg flex items-center justify-center font-mono text-sm text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        0{step.id}
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-white/60 whitespace-pre-line leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
